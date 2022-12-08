import { Avatar, Header } from '@components'
import type { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

type HomeProps = {
  session: Session
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const user = {
    name: props.session.user?.name ?? '',
    avatarUrl: props.session.user?.image ?? ''
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
