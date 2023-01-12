import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Layout } from 'src/layouts'
import { NextPageWithLayout } from '../_app'

const Channel: NextPageWithLayout = () => {
  const router = useRouter()

  const { channelTitle: title } = router.query

  return (
    <>
      <Head>
        <title>{`#${title} | Sushi`}</title>
      </Head>

      <div className="w-full max-w-lg self-start">
        {/* player main */}
        #player
      </div>
    </>
  )
}

Channel.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

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
    props: { session }
  }
}

export default Channel
