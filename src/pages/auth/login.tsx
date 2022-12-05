import {
  Button,
  Checkbox,
  Divider,
  Header,
  Heading,
  Icon,
  Text,
  TextInput,
  Tooltip
} from '@components'
import { GetServerSideProps } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'
import Head from 'next/head'
import { Envelope, Lock } from 'phosphor-react'
import { FormEvent } from 'react'

type LogInProps = {
  providers: ClientSafeProvider[]
}

const LogIn = ({ providers: objectProviders }: LogInProps) => {
  const providers = Object.values(objectProviders)

  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Head>
        <title>Log In | Sushi</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center mt-16 mx-8 md:mx-auto">
        <header className="flex flex-col items-center gap-4">
          <Heading className="text-[32px]">Log In</Heading>
          <Text className="text-[18px]">Log in and start using!</Text>
        </header>

        <div className="flex flex-row gap-2 mt-8">
          {providers.length > 0 &&
            providers.map((provider: ClientSafeProvider) => (
              <Tooltip
                key={provider.id}
                side="bottom"
                label={`Log In with ${provider.name}`}
              >
                <Button
                  className="bg-transparent hover:bg-gray-100 flex flex-row items-center gap-2"
                  onClick={() => signIn(provider.id)}
                >
                  <Icon name={provider.name} size={28} />
                </Button>
              </Tooltip>
            ))}
        </div>

        <Divider.Root className="mt-8">
          <Divider.Line />
          <Text size="sm" className="text-gray-700 uppercase">
            or
          </Text>
          <Divider.Line />
        </Divider.Root>

        <form
          onSubmit={handleLogIn}
          className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-8"
        >
          <label htmlFor="email" className="flex flex-col gap-3">
            <Text className="font-bold text-gray-700 text-base">E-mail</Text>

            <TextInput.Root>
              <TextInput.Icon>
                <Envelope />
              </TextInput.Icon>

              <TextInput.Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
            </TextInput.Root>
          </label>

          <label htmlFor="password" className="flex flex-col gap-3">
            <Text className="font-bold text-gray-700 text-base">Password</Text>

            <TextInput.Root>
              <TextInput.Icon>
                <Lock />
              </TextInput.Icon>

              <TextInput.Input
                id="password"
                type="password"
                placeholder="***************"
              />
            </TextInput.Root>
          </label>

          <label htmlFor="remember" className="flex items-center gap-2">
            <Checkbox id="remember" />

            <Text className="text-gray-700" size="md">
              Remember me for 30 days
            </Text>
          </label>

          <Button type="submit" className="mt-8">
            Log In
          </Button>

          <footer className="flex flex-col items-center gap-4 mt-6">
            <Text asChild size="md">
              <a
                href=""
                className="text-gray-700 underline hover:text-gray-500"
              >
                Forgot your password?
              </a>
            </Text>
            <Text asChild size="md">
              <span>
                No account?{' '}
                <a
                  href=""
                  className="text-red-500 underline hover:text-red-400"
                >
                  Create right now!
                </a>
              </span>
            </Text>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default LogIn

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const providers = await getProviders()

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
    props: {
      providers
    }
  }
}
