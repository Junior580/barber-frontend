import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { getValidationErrors } from '../../../utils/getValidationErros'
import { Form } from '@unform/web'

import { Container, Content, AnimationContainer, Background } from './styles'

import { useAuth } from '../../../hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/toast'
import { useMutation } from '@tanstack/react-query'

interface ISignInFormData {
  email: string
  password: string
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const login = useCallback(async (data: ISignInFormData) => {
    const response = await signIn({
      email: data.email,
      password: data.password,
    })
    return response
  }, [])

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => navigate('/dashboard'),
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu erro ao fazer login, verifique credenciais',
      }),
  })

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      return mutate(data)
    },
    [signIn, addToast],
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
