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

type UpdateProfileType = {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

export const updateProfileService = async ({
  name,
  email,
  password,
  old_password,
  password_confirmation,
}: UpdateProfileType) => {
  return api.put('/profile', {
    name,
    email,
    password,
    old_password,
    password_confirmation,
  })
}
