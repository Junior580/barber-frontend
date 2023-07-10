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

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'

interface IResetPasswordFormData {
  password: string
  password_confirmation: string
}

export const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = useCallback(
    async (data: IResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No minimo 6 dígitos'),
          password_confirmation: Yup.string()
            .min(6, 'No minimo 6 dígitos')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { password, password_confirmation } = data

        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        })

        navigate('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'success',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar sua senha, verifique suas credenciais',
        })
      }
    },
    [addToast, location],
  )

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar senha</h1>

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
              />

              <Input
                name="password_confirmation"
                icon={FiLock}
                type="password"
                placeholder="Confirmação da senha"
              />
              <Button type="submit">Alterar senha</Button>
            </Form>

            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </AnimationContainer>
        </Content>

        <Background />
      </Container>
    </>
  )
}
