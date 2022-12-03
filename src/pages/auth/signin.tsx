import { Header } from '@components'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'

const SignIn = () => {
  const { data: session } = useSession()

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Header />
      {session?.user?.name}
    </div>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      props: {
        session
      },
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
