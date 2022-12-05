import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextAuthProviders } from '../../../constants'
import { prisma } from '../../../lib'

const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/login'
  },
  providers: [
    NextAuthProviders.Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    NextAuthProviders.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
    })
    // NextAuthProviders.Twitter({
    //   clientId: process.env.TWITTER_CLIENT_ID as string,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string
    // })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
