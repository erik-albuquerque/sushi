import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import '../styles/global.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const queryClient = new QueryClient()

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
