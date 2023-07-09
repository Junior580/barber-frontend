import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { getValidationErrors } from '../../../utils/getValidationErros'
import { Form } from '@unform/web'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link } from 'react-router-dom'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'

interface IForgotPasswordFormData {
  email: string
}

export const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: IForgotPasswordFormData) => {
      try {
        setLoading(true)

        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/password/forgot', {
          email: data.email,
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada',
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar recuperar a senha',
        })
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }
      } finally {
        setLoading(false)
      }
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
              <h1>Recuperar senha</h1>

              <Input name="email" icon={FiMail} placeholder="Email" />

              <Button loading={loading} type="submit">
                Recuperar
              </Button>
            </Form>

            <Link to="/sigin">
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
