import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { useMutation } from '@tanstack/react-query'
import * as Yup from 'yup'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { addToast } from '../../../redux/toast/slice'

type ForgotPassProp = {
  email: string
}

export const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const forgotPass = useCallback(async (data: ForgotPassProp) => {
    const response = await api.post('/password/forgot', {
      email: data.email,
    })
    return response
  }, [])

  const { mutate, isLoading } = useMutation(forgotPass, {
    onSuccess: () => {
      dispatch(
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada',
        }),
      )
      return navigate('/')
    },
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar recuperar a senha',
      }),
  })

  const handleSubmit = useCallback(
    async (data: ForgotPassProp) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
      })

      await schema.validate(data, {
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
              <h1>Recuperar senha</h1>

              <Input name="email" icon={FiMail} placeholder="Email" />

              <Button loading={isLoading} type="submit">
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
