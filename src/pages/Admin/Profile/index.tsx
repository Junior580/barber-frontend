import React, { useCallback, useRef, ChangeEvent } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { Container, Content, AvatarInput } from './styles'

import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { useAuth } from '../../../hooks/auth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileService } from '../../../services/services'
import userDefault from '../../../assets/icon-user.png'

const UpdateProfileSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    old_password: z.string().min(6),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  })
  .superRefine((fields, context) => {
    if (fields.password !== fields.password_confirmation) {
      context.addIssue({
        path: ['password_confirmation'],
        code: z.ZodIssueCode.invalid_date,
        message: 'As senhas devem ser iguais.',
      })
    }
  })

type UpdateProfileType = z.infer<typeof UpdateProfileSchema>

const Profile: React.FC = () => {
  const { addToast } = useToast()

  const { user, updateUser } = useAuth()

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateProfileService,
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description:
          'Suas informações do perfil foram atualizadas com sucesso.',
      })
      return navigate('/')
    },
    onError: () =>
      addToast({
        type: 'error',
        title: 'Erro ao atualizar',
        description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
      }),
  })

  const onSubmit: SubmitHandler<UpdateProfileType> = useCallback(
    async data => mutateAsync(data),
    [mutateAsync],
  )

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData() //verificar aqui
        data.append('avatar', e.target.files[0]) //verificar aqui
        api
          .patch('/users/avatar', data)
          .then(response => {
            const { user } = response.data
            updateUser(user)

            addToast({
              type: 'success',
              title: 'Avatar atualizado',
            })
          })
          .catch(e => console.log(`handleAvatarChange error: ${e}`))
      }
    },
    [addToast, updateUser],
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput>
            <img
              src={user.avatar_url ? user.avatar_url : userDefault}
              alt={user.name}
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={FiUser}
                placeholder="Nome"
                onChange={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={FiMail}
                placeholder="E-mail"
                onChange={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value } }) => (
              <Input
                // containerStyle={{ marginTop: 24 }}
                icon={FiLock}
                type="password"
                placeholder="Senha atual"
                onChange={onChange}
                value={value}
                error={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
                onChange={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={FiLock}
                type="password"
                placeholder="Confirmar senha"
                onChange={onChange}
                value={value}
                error={errors.password_confirmation?.message}
              />
            )}
          />

          <Button type="submit" loading={isLoading}>
            Confirmar mudanças
          </Button>
        </form>
      </Content>
    </Container>
  )
}

export default Profile
