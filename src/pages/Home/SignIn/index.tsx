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
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/root-reducer'
import { signInAsync } from '../../../redux/auth/slice'
import { AppDispatch } from '../../../redux/store'
import { addToast } from '../../../redux/toast/slice'

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  })

  const login = useCallback(async ({ email, password }: SignInSchemaType) => {
    await dispatch(
      signInAsync({
        email,
        password,
      }),
    ).unwrap()
  }, [])

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => navigate('/dashboard'),
    onError: () => {
      return dispatch(
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: auth.error as string,
        }),
      )
    },
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = useCallback(
    async data => mutate(data),
    [],
  )

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
