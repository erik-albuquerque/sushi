import { prisma } from '@lib'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { FormikSignUpInitialValuesTypes } from '@types'
import { generateSessionToken, timeFromDate } from '@utils'
import { hash } from 'bcryptjs'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const adapter = PrismaAdapter(prisma)

  if (req.method === 'POST') {
    try {
      const data: FormikSignUpInitialValuesTypes = req.body

      if (!data) {
        return res.status(404).json({ message: "Don't have form data" })
      }

      const [userExists, usernameExists] = await prisma.$transaction([
        prisma.user.findUnique({
          where: {
            email: data.email
          }
        }),
        prisma.user.findFirst({
          where: {
            username: data.nickname
          }
        })
      ])

      if (userExists) {
        return res.status(422).json({ message: 'User already exists' })
      }

      if (usernameExists) {
        return res.status(422).json({ message: 'Username already exists' })
      }

      const password = await hash(data.password, 10)

      const userData = {
        name: data.nickname,
        username: data.nickname,
        email: data.email,
        password
      }

      const user = await prisma.user.create({
        data: userData
      })

      const sessionToken = generateSessionToken()

      const sessionMaxAge = 2 * 60 * 60 // 2 hours

      const sessionExpiry = timeFromDate(sessionMaxAge)

      await adapter.createSession({
        sessionToken: sessionToken,
        userId: user.id,
        expires: sessionExpiry
      })

      const cookies = new Cookies(req, res)

      cookies.set('next-auth.session-token', sessionToken, {
        expires: sessionExpiry
      })

      res.status(201).json({ user })
    } catch (error) {
      console.log(error)
      throw new Error('Error on sign up')
    }
  } else {
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST accepted' })
  }
}
