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
  toast,
  Toast,
  Tooltip
} from '@components'
import { logInSchema } from '@schemas'
import { FormikLogInInitialValuesTypes } from '@types'
import { Field, Formik } from 'formik'
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
import { Envelope } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'

type LogInProps = {
  providers: ClientSafeProvider[]
}

const LogIn = (props: LogInProps) => {
  const router = useRouter()

  const providers = Object.values(props.providers).filter(
    (provider) => provider.name !== 'Credentials'
  )

  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const formikInitialValues = {
    email: '',
    password: '',
    isRememberMe: false
  } as FormikLogInInitialValuesTypes

  const onSubmit = async (values: FormikLogInInitialValuesTypes) => {
    const credentialsResponse = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      isRememberMe: values.isRememberMe,
      callbackUrl: '/'
    })

    if (credentialsResponse?.ok) {
      credentialsResponse.url && router.push(credentialsResponse.url)
    }

    if (credentialsResponse?.error) {
      toast.error(credentialsResponse.error)
    }
  }

  useEffect(() => {
    let toastId: string

    if (formRef.current) {
      formRef.current.addEventListener('submit', () => {
        toastId = toast.loading('Login...')

        router.events.on('routeChangeStart', () => {
          toast.success('Login successfully', { id: toastId })
          setIsLoading(true)
        })

        router.events.on('routeChangeComplete', () => {
          toast.dismiss(toastId)
          setIsLoading(false)
        })

        router.events.on('routeChangeError', () => {
          toast.dismiss(toastId)
          setIsLoading(false)
        })
      })
    }

    return () => {
      if (formRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        formRef.current.removeEventListener('submit', () => {
          router.events.off('routeChangeStart', () => {
            toast.success('Login successfully', { id: toastId })
            setIsLoading(true)
          })

          router.events.off('routeChangeComplete', () => {
            toast.dismiss(toastId)
            setIsLoading(false)
          })

          router.events.off('routeChangeError', () => {
            toast.dismiss(toastId)
            setIsLoading(false)
          })
        })
      }
    }
  }, [router.events])

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Head>
        <title>Log In | Sushi</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center gap-8 mt-16 mx-8 md:mx-auto">
        <header className="flex flex-col items-center gap-4">
          <Heading className="text-[32px]">Log In</Heading>
          <Text className="text-[18px]">Log in and start using!</Text>
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
          validationSchema={logInSchema}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 items-stretch w-full max-w-sm"
              ref={formRef}
            >
              <div className="flex flex-col gap-6 items-stretch w-full">
                <label htmlFor="email" className="flex flex-col gap-4">
                  <Text className="font-bold text-gray-700 text-base">
                    E-mail
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

                  {formik.errors.email && (
                    <Text className="!text-red-500">{formik.errors.email}</Text>
                  )}
                </label>

                <label htmlFor="password" className="flex flex-col gap-4">
                  <Text className="font-bold text-gray-700 text-base">
                    Password
                  </Text>

                  <InputPassword {...formik.getFieldProps('password')} />

                  {formik.errors.password && (
                    <Text className="!text-red-500">
                      {formik.errors.password}
                    </Text>
                  )}
                </label>

                <label
                  htmlFor="remember"
                  className="flex items-center gap-2 select-none"
                >
                  <Field id="remember" type="checkbox" name="isRememberMe" />
                  <Text className="text-gray-700" size="md">
                    Remember me for 30 days
                  </Text>
                </label>
              </div>

              <Button
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                className="flex items-center justify-center"
              >
                {formik.isSubmitting || isLoading ? (
                  <Loading color="#ffffff" width={20} height={20} />
                ) : (
                  'Log in'
                )}
              </Button>

              <footer className="flex flex-col items-center gap-4">
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
                    <Link href="/signup" passHref>
                      <a className="text-red-500 underline hover:text-red-400">
                        Create right now!
                      </a>
                    </Link>
                  </span>
                </Text>
              </footer>
            </form>
          )}
        </Formik>

        <Toast />
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
