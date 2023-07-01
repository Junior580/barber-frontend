import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { getValidationErrors } from '../../utils/getValidationErros'
import { Form } from '@unform/web'

import { Container, Content, AnimationContainer, Background } from './styles'

import { useAuth } from '../../hooks/auth'
import { Link } from 'react-router-dom'
import { useToast } from '../../hooks/toast'

interface ISignInFormData {
  email: string
  password: string
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
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

        // signIn({
        //   email: data.email,
        //   password: data.password,
        // })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast()
      }
    },
    [signIn],
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

              <Button type="submit">Entrar</Button>

              <Link to="/forgot">Esqueci minha senha</Link>
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
