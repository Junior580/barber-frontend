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
import { useMutation } from '@tanstack/react-query'

type ResetPassProp = {
  password: string
  password_confirmation: string
}

export const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const resetPass = useCallback(async (data: ResetPassProp) => {
    const { password, password_confirmation } = data
    const token = location.search.replace('?token=', '')
    if (!token) {
      throw new Error()
    }
    const response = await api.post('/password/reset', {
      password,
      password_confirmation,
      token,
    })
    return response
  }, [])

  const { mutate } = useMutation(resetPass, {
    onSuccess: () => navigate('/'),
    onError: () =>
      addToast({
        type: 'success',
        title: 'Erro ao resetar senha',
        description:
          'Ocorreu um erro ao resetar sua senha, verifique suas credenciais',
      }),
  })

  const handleSubmit = useCallback(
    async (data: ResetPassProp) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
        password_confirmation: Yup.string()
          .min(6, 'No minimo 6 dígitos')
          .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
      })

      const teste = await schema.validate(data, {
        abortEarly: false,
      })

      return mutate(data)
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
