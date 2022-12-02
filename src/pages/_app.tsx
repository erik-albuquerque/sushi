import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/global.css'

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
