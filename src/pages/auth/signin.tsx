import { GetServerSideProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'

const SignIn = () => {
  const { data: session } = useSession()

  return (
    <div>
      <div className="mr-2">
        {session ? (
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => signOut()}
          >
            logout
          </button>
        ) : (
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => signIn('google')}
          >
            login
          </button>
        )}
      </div>
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
