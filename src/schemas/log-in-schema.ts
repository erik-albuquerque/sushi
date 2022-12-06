import * as Yup from 'yup'

const logInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  isRememberMe: Yup.boolean().default(false)
})

export { logInSchema }
