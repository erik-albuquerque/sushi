import * as Yup from 'yup'

const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  nickname: Yup.string().required('Nickname is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than 16 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Password not match')
})

export { signUpSchema }
