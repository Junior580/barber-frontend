import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
})

function handleRequestError(error: AxiosError) {
  if (error.response) {
    console.error('Erro de resposta do servidor:', error.response.data)
    throw new Error('Erro de resposta do servidor')
  } else if (error.request) {
    console.error('Sem resposta do servidor:', error.request)
    throw new Error('Sem resposta do servidor')
  } else {
    console.error('Erro ao configurar a solicitação:', error.message)
    throw new Error('Erro ao configurar a solicitação')
  }
}
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => handleRequestError(error),
)

api.interceptors.request.use(
  config => config,
  (error: AxiosError) => handleRequestError(error),
)

export default api
