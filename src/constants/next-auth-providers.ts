import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import TwitterProvider from 'next-auth/providers/twitter'

const Providers = {
  Google: GoogleProvider,
  Spotify: SpotifyProvider,
  Twitter: TwitterProvider
}

const NextAuthProviders = Providers

export { NextAuthProviders }
