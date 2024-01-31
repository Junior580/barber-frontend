import React, { useCallback } from 'react'

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import {
  MutationCache,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useToast } from '../../../hooks/toast'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import axios from 'axios'

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignIn: React.FC = () => {
  // const { signIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  })

  const signIn = useCallback(async ({ email, password }: SignInSchemaType) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })
    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    return user
  }, [])

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signIn,
    onSuccess: user => queryClient.setQueryData(['signindata'], user),
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu erro ao fazer login, cheque credenciais',
      }),
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = useCallback(
    async data => mutateAsync(data),
    [mutateAsync],
  )

  //teste

  const { data: testData } = useQuery({
    queryKey: ['testData'],
    queryFn: async () => {
      return axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.data)
    },
  })

  const queryClient = useQueryClient()
  const query = queryClient.getQueryData(['signindata'])
  console.log(`🔥 ~ queryCache ~ ${JSON.stringify(query)}  `)

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Faça seu logon</h1>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    icon={FiMail}
                    placeholder="Email"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                    error={errors.password?.message}
                  />
                )}
              />

              <Button type="submit" loading={isLoading}>
                Entrar
              </Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>

        <Background />
      </Container>
    </>
  )
}
