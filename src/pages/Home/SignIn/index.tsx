import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { Form } from '@unform/web'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/toast'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/root-reducer'
import { signInAsync } from '../../../redux/auth/slice'
import { AppDispatch } from '../../../redux/store'

type SignInFormProps = {
  email: string
  password: string
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const { auth } = useSelector((selector: RootState) => selector)
  const dispatch = useDispatch<AppDispatch>()

  const { addToast } = useToast()

  const login = useCallback(async ({ email, password }: SignInFormProps) => {
    dispatch(
      signInAsync({
        email,
        password,
      }),
    )
  }, [])

  // const login = useCallback(async (data: ISignInFormData) => {
  //   const response = await signIn({
  //     email: data.email,
  //     password: data.password,
  //   })
  //   return response
  // }, [])

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => navigate('/dashboard'),
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        // description: 'Ocorreu erro ao fazer login, verifique credenciais',
        description: auth.error,
      }),
  })

  const handleSubmit = useCallback(
    async (data: SignInFormProps) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
      })

      const failed = await schema.validate(data, {
        abortEarly: false,
      })

      return mutate(data)
    },
    [addToast],
  )

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>

              <Input name="email" icon={FiMail} placeholder="Email" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit" loading={isLoading}>
                Entrar
              </Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

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
