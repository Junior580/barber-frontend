import api from './api'

type SignUpProps = {
  name: string
  email: string
  password: string
}

export const signUpService = async ({ name, email, password }: SignUpProps) => {
  return api.post('/users', { name, email, password })
}

type ForgotPassProps = {
  email: string
}

export const forgotPassService = async (data: ForgotPassProps) => {
  return api.post('/password/forgot', {
    email: data.email,
  })
}
