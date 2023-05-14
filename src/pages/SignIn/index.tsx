import React, { useCallback, useRef, useContext } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { getValidationErrors } from '../../utils/getValidationErros'
import { Form } from '@unform/web'

import { Container, Content, Background } from './styles'

import { AuthContext } from '../../context/AuthContext'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const auth = useContext(AuthContext)
  console.log(auth)

  const handleSubmit = useCallback(async (data: object) => {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <>
      <Container>
        <Content>
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

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <a href="forgot">
            <FiLogIn />
            Criar conta
          </a>
        </Content>

        <Background />
      </Container>
    </>
  )
}

export default SignIn
