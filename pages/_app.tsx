import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export { App }
