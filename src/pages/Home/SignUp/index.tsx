import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useMutation } from '@tanstack/react-query'
import LogoImg from '../../../assets/logo.svg'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Container, Content, AnimationContainer, Background } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../../../hooks/toast'
import { signUpService } from '../../../services/services'
import { useAuth } from '../../../hooks/auth'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export const SignUp: React.FC = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  })

  const { mutate } = useMutation(signUpService, {
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Cadastro Realizado',
        description: 'Voce já pode fazer seu logon',
      })
      return navigate('/')
    },
    onError: e =>
      addToast({
        type: 'error',
        title: 'Erro no cadastro.',
        description: `Ocorreu um erro no cadastro: ${e}`,
      }),
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(
    async data => mutate(data),
    [],
  )

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Faça seu cadastro</h1>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    icon={FiUser}
                    placeholder="Nome"
                    error={errors.name?.message}
                  />
                )}
              />

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

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    icon={FiLock}
                    placeholder="Senha"
                    error={errors.password?.message}
                  />
                )}
              />

              <Button type="submit">Cadastrar</Button>
            </form>

            <Link to="/">
              <FiArrowLeft />
              Voltar Para Logon
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  )
}
