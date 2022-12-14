import { Text } from '@components'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Layout } from 'src/layouts'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <div className="min-h-min sm:ml-[15%] mr-auto flex flex-row items-center">
      <Head>
        <title>Home | Sushi</title>
      </Head>

      <Text className="text-gray-400">Player will appear here :)</Text>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 403
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
