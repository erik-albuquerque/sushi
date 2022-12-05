import { Avatar, Header } from '@components'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name ?? '',
    avatarUrl: session?.user?.image ?? ''
  }

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Header>
        <Avatar.Root>
          {user.avatarUrl ? (
            <Avatar.Image url={user.avatarUrl} />
          ) : (
            <Avatar.AutoFill user={user} />
          )}
        </Avatar.Root>
      </Header>
    </div>
  )
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
    props: { session }
  }
}
