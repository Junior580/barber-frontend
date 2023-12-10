import { AxiosError } from 'axios'
import api from './api'

type SignUpProp = {
  name: string
  email: string
  password: string
}

const signUpService = async ({ name, email, password }: SignUpProp) => {
  return new Promise((resolve, reject) => {
    return api.post('/users', { name, email, password }).then(
      response => {
        resolve(response)
      },
      (error: AxiosError) => {
        const errorMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        reject(errorMessage)
      },
    )
  })
}

export default signUpService
