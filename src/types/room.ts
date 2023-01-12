type Participant = {
  id: string
  name: string | null
  username: string | null
  image: string | null
}

type Participants = Participant[]

type Room = {
  id: string
  title: string
  private: boolean
  ownerId: string
  createdAt: Date
  updatedAt: Date
  participants: Participants
}

type CurrentRoom = Pick<Room, 'id' | 'title'>

export type { Room, CurrentRoom, Participant, Participants }
