import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

type SignInProps = {
  email: string
  password: string
}

const signIn = async ({
  email,
  password,
}: SignInProps): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/login', { email, password })
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      throw handleRequestError(error)
    } else {
      console.error('Erro desconhecido:', error)
      throw new Error('Erro desconhecido')
    }
  }
}

const handleRequestError = (error: AxiosError) => {
  if (error.response) {
    console.error('Erro de resposta do servidor:', error.response.data)
    return new Error('Erro de resposta do servidor')
  } else if (error.request) {
    console.error('Sem resposta do servidor:', error.request)
    return new Error('Sem resposta do servidor')
  } else {
    console.error('Erro ao configurar a solicitação:', error.message)
    return new Error('Erro ao configurar a solicitação')
  }
}

export default { signIn }
