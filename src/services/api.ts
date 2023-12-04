import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

type SignInProps = {
  email: string
  password: string
}

class APIService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
    })
  }

  async signIn({ email, password }: SignInProps): Promise<AxiosResponse> {
    try {
      const response = await this.api.post('/login', { email, password })
      return response
    } catch (error: any) {
      throw this.handleRequestError(error)
    }
  }

  private handleRequestError(error: AxiosError) {
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
}

export default APIService
