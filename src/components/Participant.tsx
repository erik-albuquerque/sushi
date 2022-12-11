import { Avatar, Text } from '@components'

type ParticipantProps = {
  user: {
    name: string | null
    username: string | null
    image: string | null
  }
}

const Participant = ({ user }: ParticipantProps) => {
  return (
    <div className="flex flex-row gap-2 items-center ml-2 hover:bg-gray-50 p-2 rounded-xl cursor-pointer">
      <Avatar.Root>
        {user.image ? (
          <Avatar.Image size={24} url={user.image} />
        ) : (
          <Avatar.AutoFill
            size={20}
            user={{
              name: user.name || user.username || ''
            }}
          />
        )}
      </Avatar.Root>
      <Text>{user.username || user.name}</Text>
    </div>
  )
}

export { Participant }
