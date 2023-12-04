import React, { useCallback, useRef } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'
// import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

// import { Form } from '@unform/web'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/root-reducer'
import { signInAsync } from '../../../redux/auth/slice'
import { AppDispatch } from '../../../redux/store'
import { addToast } from '../../../redux/toast/slice'

type SignInFormProps = {
  email: string
  password: string
}

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignIn: React.FC = () => {
  // const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  })

  const login = useCallback(async ({ email, password }: SignInFormProps) => {
    await dispatch(
      signInAsync({
        email,
        password,
      }),
    ).unwrap()
  }, [])

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => navigate('/dashboard'),
    onError: () =>
      dispatch(
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: auth.error,
        }),
      ),
  })

  const onSubmit = useCallback(
    async (data: SignInFormProps) => {
      // formRef.current?.setErrors({})

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

            {/* <Form ref={formRef} onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Faça seu logon</h1>

              <Input name="email" icon={FiMail} placeholder="Email" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
                register={register('password')}
              />

              <Button type="submit" loading={isLoading}>
                Entrar
              </Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
              {/* </Form> */}
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
