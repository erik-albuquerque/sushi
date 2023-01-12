import { prisma } from '@lib'
import { Room } from '@types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const roomsData = await prisma.room.findMany({
        include: {
          participants: {
            include: {
              user: true
            }
          }
        }
      })

      const rooms: Room[] = roomsData.map((r) => {
        const participants = r.participants.map((p) => {
          const user = {
            id: p.user.id,
            name: p.user.name,
            username: p.user.username,
            image: p.user.image
          }

          return user
        })

        const room = {
          id: r.id,
          title: r.title,
          private: r.private,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          ownerId: r.ownerId,
          participants
        }

        return room
      })

      console.log('roomsDataFromApi', JSON.stringify(rooms, null, 2))

      res.status(200).json({ rooms })
    } catch (error) {
      console.log('Error on get rooms', error)
      throw new Error('Error on get rooms')
    }
  }
}
