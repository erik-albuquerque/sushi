import { prisma } from '@lib'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const body = req.body

    console.log(body)

    try {
      const participantsData = await prisma.participant.findMany({
        where: {
          roomId: body.roomId
        },
        include: {
          user: true
        }
      })

      const participants = participantsData.map((p) => {
        const user = {
          id: p.user.id,
          name: p.user.name,
          username: p.user.username,
          image: p.user.image
        }

        return user
      })

      console.log(
        'participantsDataFromApi',
        JSON.stringify(participants, null, 2)
      )

      res.status(200).json({ participants })
    } catch (error) {
      console.log('Error on get participants', error)
      throw new Error('Error on get participants')
    }
  }
  if (req.method === 'PUT') {
    const data = req.body

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: data.userEmail
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }

      const room = await prisma.room.findFirst({
        where: {
          id: data.roomId
        }
      })

      if (!room) {
        return res.status(404).json({ message: 'Room not found!' })
      }

      await prisma.participant.create({
        data: {
          roomId: room.id,
          userId: user.id
        }
      })

      return res.status(200).send({})
    } catch (error) {
      console.log('Error on update room', error)
      throw new Error('Error on update room.')
    }
  }
}
