import {
  Button,
  Divider,
  Header,
  Heading,
  Icon,
  InputPassword,
  Loading,
  Text,
  TextInput,
  Tooltip
} from '@components'
import { BASE_URL } from '@constants'
import { signUpSchema } from '@schemas'
import { FormikSignUpInitialValuesTypes } from '@types'
import { Formik } from 'formik'
import { GetServerSideProps } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Envelope, UserCircle } from 'phosphor-react'

type SignUpProps = {
  providers: ClientSafeProvider[]
}

const SignUp = (props: SignUpProps) => {
  const router = useRouter()
  const providers = Object.values(props.providers).filter(
    (provider) => provider.name !== 'Credentials'
  )

  const formikInitialValues = {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  } as FormikSignUpInitialValuesTypes

  const onSubmit = async (values: FormikSignUpInitialValuesTypes) => {
    await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push('/')
      })
  }

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Head>
        <title>Sign Up | Sushi</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center gap-8 mt-16 mx-8 md:mx-auto">
        <header className="flex flex-col items-center gap-4">
          <Heading className="text-[32px]">Sign Up</Heading>
          <Text className="text-[18px]">Sign up and enjoy the party!</Text>
        </header>

        <div className="flex flex-row items-center gap-2">
          {providers.length > 0 &&
            providers.map((provider: ClientSafeProvider) => (
              <Tooltip
                key={provider.id}
                side="bottom"
                label={`Log In with ${provider.name}`}
              >
                <Button
                  className="bg-transparent hover:bg-gray-100 flex items-center"
                  onClick={() => signIn(provider.id)}
                >
                  <Icon name={provider.name} size={28} />
                </Button>
              </Tooltip>
            ))}
        </div>

        <Divider.Root>
          <Divider.Line />
          <Text size="sm" className="text-gray-700 uppercase">
            or
          </Text>
          <Divider.Line />
        </Divider.Root>

        <Formik
          initialValues={formikInitialValues}
          onSubmit={onSubmit}
          validationSchema={signUpSchema}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 items-stretch w-full max-w-sm"
            >
              <div className="flex flex-col gap-6 items-stretch w-full">
                <label htmlFor="email" className="flex flex-col gap-4">
                  <Text className="font-bold text-gray-700 text-base">
                    {`What's your email?`}
                  </Text>

                  <TextInput.Root>
                    <TextInput.Icon>
                      <Envelope />
                    </TextInput.Icon>

                    <TextInput.Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      {...formik.getFieldProps('email')}
                    />
                  </TextInput.Root>
                </label>

                <label htmlFor="nickname" className="flex flex-col gap-4">
                  <Text className="font-bold text-gray-700 text-base">
                    What should we call you?
                  </Text>

                  <TextInput.Root>
                    <TextInput.Icon>
                      <UserCircle />
                    </TextInput.Icon>

                    <TextInput.Input
                      id="nickname"
                      type="text"
                      placeholder="johndoe"
                      {...formik.getFieldProps('nickname')}
                    />
                  </TextInput.Root>

                  {formik.errors.nickname && (
                    <Text className="!text-red-500">
                      {formik.errors.nickname}
                    </Text>
                  )}
                </label>

                <label htmlFor="password" className="flex flex-col gap-4">
                  <Text className="font-bold text-gray-700 text-base">
                    Create a password
                  </Text>

                  <InputPassword {...formik.getFieldProps('password')} />

                  {formik.errors.password && (
                    <Text className="!text-red-500">
                      {formik.errors.password}
                    </Text>
                  )}
                </label>

                <label
                  htmlFor="confirmPassword"
                  className="flex flex-col gap-4"
                >
                  <Text className="font-bold text-gray-700 text-base">
                    Confirm your password
                  </Text>

                  <InputPassword
                    id="confirmPassword"
                    {...formik.getFieldProps('confirmPassword')}
                  />

                  {formik.errors.confirmPassword && (
                    <Text className="!text-red-500">
                      {formik.errors.confirmPassword}
                    </Text>
                  )}
                </label>
              </div>

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="flex items-center justify-center"
              >
                {formik.isSubmitting ? (
                  <Loading color="#ffffff" width={20} height={20} />
                ) : (
                  'Create Account'
                )}
              </Button>

              <footer className="flex flex-col items-center gap-4">
                <Text asChild size="md">
                  <span>
                    Have an account?{' '}
                    <Link href="/auth/login" passHref>
                      <a className="text-red-500 underline hover:text-red-400">
                        Log in
                      </a>
                    </Link>
                  </span>
                </Text>
              </footer>
            </form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default SignUp

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
