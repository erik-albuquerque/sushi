import { Collapsible, Footer, Participant, Room, Text } from '@components'
import { useQuery } from '@tanstack/react-query'
import { CurrentRoom, Participants, Room as RoomProps } from '@types'
import { removeWhiteSpace } from '@utils'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const SideBar: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [currentRoom, setCurrentRoom] = useState<CurrentRoom>({} as CurrentRoom)

  const {
    isLoading,
    data: rooms,
    error,
    refetch: refetchRooms
  } = useQuery<RoomProps[]>(['rooms'], () =>
    axios.get('/api/room').then((res) => res.data.rooms)
  )

  const { data: participants, refetch: refetchParticipants } =
    useQuery<Participants>(['participants'], () =>
      axios
        .get('/api/participant', {
          data: {
            roomId: currentRoom.id
          }
        })
        .then((res) => res.data.participants)
    )

  const updateParticipant = useCallback(
    async (roomId: string) => {
      await axios.put('/api/participant', {
        userEmail: session?.user?.email,
        roomId
      })
    },
    [session?.user?.email]
  )

  const handleRoom = useCallback(
    async (roomId: string) => {
      const room = rooms?.find((room: RoomProps) => room.id === roomId)

      if (room) {
        if (room.id === currentRoom.id) return

        const user = room.participants.find(
          (participant) => participant.name === session?.user?.name
        )

        if (!user) {
          await updateParticipant(roomId)

          refetchRooms({ queryKey: ['rooms'] })

          refetchParticipants({ queryKey: ['participants'] })
        }

        localStorage.setItem(
          'sushi:currentRoom',
          JSON.stringify({ id: room.id, title: room.title })
        )
        setCurrentRoom({ id: room.id, title: room.title })
      }
    },
    [
      currentRoom.id,
      refetchParticipants,
      refetchRooms,
      rooms,
      session?.user?.name,
      updateParticipant
    ]
  )

  useEffect(() => {
    const currentRoomFromLocalStorage =
      localStorage.getItem('sushi:currentRoom')

    const parsedCurrentRoomFromLocalStorage: CurrentRoom =
      currentRoomFromLocalStorage && JSON.parse(currentRoomFromLocalStorage)

    if (router.asPath !== '/' && parsedCurrentRoomFromLocalStorage) {
      setCurrentRoom(parsedCurrentRoomFromLocalStorage)
    } else {
      setCurrentRoom({} as CurrentRoom)
    }
  }, [router.asPath])

  return (
    <nav className="flex flex-col justify-between gap-16 mt-[59px] min-w-[150px]  max-w-[170px] w-full">
      <div className="flex flex-col gap-4 ">
        <Collapsible
          className="items-center"
          content={<Text className="text-base font-medium">Channels</Text>}
        >
          {isLoading ? (
            <Text>Loading..</Text>
          ) : error ? (
            <Text>{`An error has occurred: ${error}`}</Text>
          ) : (
            rooms?.map((room) => (
              <div key={room.id} onClick={() => handleRoom(room.id)}>
                <Room
                  room={room}
                  href={`/channels/${removeWhiteSpace(room.title)}`}
                />
              </div>
            ))
          )}
        </Collapsible>

        {currentRoom.title && (
          <Collapsible
            content={
              <div className="flex flex-col w-full">
                <Text className="text-base font-medium">Users</Text>
                <Text className="text-base font-medium">connected</Text>
                <Text className="text-base  font-medium max-w-[140px] truncate ...">
                  on #{currentRoom.title}
                </Text>
              </div>
            }
          >
            {participants?.map((participant) => (
              <Participant key={participant.id} user={participant} />
            ))}
          </Collapsible>
        )}
      </div>

      <Footer />
    </nav>
  )
}

export { SideBar }
