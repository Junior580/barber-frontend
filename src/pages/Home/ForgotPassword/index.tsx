import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import LogoImg from '../../../assets/logo.svg'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { forgotPassService } from '../../../services/services'

const ForgotPassSchema = z.object({
  email: z.string().email(),
})

type ForgotPassSchemaType = z.infer<typeof ForgotPassSchema>

export const ForgotPassword: React.FC = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassSchemaType>({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: { email: '' },
  })

  const { mutate, isLoading } = useMutation(forgotPassService, {
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description:
          'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada',
      })
      return navigate('/')
    },
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar recuperar a senha',
      }),
  })

  const onSubmit: SubmitHandler<ForgotPassSchemaType> = useCallback(
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
              <h1>Recuperar senha</h1>

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

              <Button loading={isLoading} type="submit">
                Recuperar
              </Button>
            </form>

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
