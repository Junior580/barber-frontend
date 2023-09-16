import { useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { getValidationErrors } from '../../../utils/getValidationErros'
import LogoImg from '../../../assets/logo.svg'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Container, Content, AnimationContainer, Background } from './styles'
import { useAuth } from '../../../hooks/auth'

interface ISignUpFormData {
  name: string
  email: string
  password: string
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const navigate = useNavigate()

  const signUp = useCallback(async (data: ISignUpFormData) => {
    const response = await api.post('/users', data)
    return response
  }, [])

  const { mutate } = useMutation(signUp, {
    onSuccess: () => {
      return navigate('/')
    },
    onError: () => {
      return addToast({
        type: 'error',
        title: 'Erro no cadastro.',
        description: 'Ocorreu um erro no cadastro, tente novamente.',
      })
    },
  })

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      return mutate(data)
    },
    [addToast, navigate],
  )

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" />

              <Input name="email" icon={FiMail} placeholder="Email" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

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
