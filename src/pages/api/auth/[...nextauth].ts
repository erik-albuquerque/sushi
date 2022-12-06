import { NextAuthProviders } from '@constants'
import { prisma } from '@lib'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { FormikLogInInitialValuesTypes } from '@types'
import { generateSessionToken } from '@utils'
import Cookies from 'cookies'
import { NextApiHandler } from 'next'
import NextAuth, { CallbacksOptions, NextAuthOptions } from 'next-auth'
import { decode, encode } from 'next-auth/jwt'

const handler: NextApiHandler = async (req, res) => {
  const adapter = PrismaAdapter(prisma)

  const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
  }

  const callbacks: CallbacksOptions = {
    async signIn({ user }) {
      if (
        req.query['nextauth']?.includes('callback') &&
        req.query['nextauth']?.includes('credentials') &&
        req.method === 'POST'
      ) {
        if (user) {
          const sessionToken = generateSessionToken()
          const sessionMaxAge = 60 * 60 * 24 * 30 //30Days
          const sessionExpiry = fromDate(sessionMaxAge)

          await adapter.createSession({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry
          })

          const cookies = new Cookies(req, res)

          cookies.set('next-auth.session-token', sessionToken, {
            expires: sessionExpiry
          })
        }
      }

      return true
    },
    // async register({  }) {
    //   try {
    //     await prisma.user.create({
    //       data: {
    //         name,
    //         username,
    //         email,
    //         image,
    //         password
    //       }
    //     })
    //     return true
    //   } catch (err) {
    //     console.error('Failed to register user. Error', err)
    //     return false
    //   }
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session }) {
      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl
    }
  }

  const options: NextAuthOptions = {
    session: {
      strategy: 'database',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      updateAge: 24 * 60 * 60 // 24 hours
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query['nextauth']?.includes('callback') &&
          req.query['nextauth']?.includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookies = new Cookies(req, res)

          const cookie = cookies.get('next-auth.session-token')

          if (cookie) return cookie
          else return ''
        }
        return encode({ token, secret, maxAge })
      },
      decode: async ({ token, secret }) => {
        if (
          req.query['nextauth']?.includes('callback') &&
          req.query['nextauth']?.includes('credentials') &&
          req.method === 'POST'
        ) {
          return null
        }

        return decode({ token, secret })
      }
    },
    debug: process.env.NODE_ENV === 'development',
    adapter,
    secret: process.env.JWT_SECRET,
    logger: {
      error(code, metadata) {
        console.log({ type: 'inside error logger', code, metadata })
      },
      warn(code) {
        console.log({ type: 'inside warn logger', code })
      },
      debug(code, metadata) {
        console.log({ type: 'inside debug logger', code, metadata })
      }
    },
    providers: [
      NextAuthProviders.Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      NextAuthProviders.Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
      }),
      // NextAuthProviders.Twitter({
      //   clientId: process.env.TWITTER_CLIENT_ID as string,
      //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string
      // })
      NextAuthProviders.Credentials({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials) {
          const { email, password, isRememberMe } =
            credentials as FormikLogInInitialValuesTypes

          const user = await prisma.user.findUnique({
            where: {
              email
            }
          })

          console.log('Remember me: ', isRememberMe)

          if (!user) {
            throw new Error('No user found with E-mail. Please sign up!')
          }

          // const checkPassword = await compare(
          //   password,
          //   user.password ? user.password : ''
          // )

          const checkPassword = user.password === password

          if (!checkPassword || user.email !== email) {
            throw new Error("Email or Password doesn't match!")
          }

          return user
        }
      })
    ],
    callbacks,
    pages: {
      signIn: '/auth/login'
    }
  }

  return await NextAuth(req, res, options)
}

export default handler
