import { AxiosError } from 'axios'
import api from './api'

type LoginProps = {
  email: string
  password: string
}

type UserProps = {
  id: string
  name: string
  avatar_url: string
}

type AuthResponse = {
  token: string
  user: UserProps
}

const login = async ({
  email,
  password,
}: LoginProps): Promise<AuthResponse> => {
  return new Promise(async (resolve, reject) => {
    return await api.post<AuthResponse>('/sessions', { email, password }).then(
      response => {
        const { user, token } = response.data

        api.defaults.headers.authorization = `Bearer ${token}`

        localStorage.setItem('@GoBarber:token', token)

        localStorage.setItem('@GoBarber:user', JSON.stringify(user))

        resolve({ user, token })
      },
      error => {
        const errorMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        reject(errorMessage)
      },
    )
  })
}

export default {
  login,
}
