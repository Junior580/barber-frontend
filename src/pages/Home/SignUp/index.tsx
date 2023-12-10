import { useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useMutation } from '@tanstack/react-query'
import signUpService from '../../../services/signUp.service'
import LogoImg from '../../../assets/logo.svg'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Container, Content, AnimationContainer, Background } from './styles'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { addToast } from '../../../redux/toast/slice'
import { getValidationErrors } from '../../../utils/getValidationErros'

type SignUpProp = {
  name: string
  email: string
  password: string
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const signUp = useCallback(async (data: SignUpProp) => {
    return await signUpService(data)
  }, [])

  const { mutate } = useMutation(signUp, {
    onSuccess: () => {
      dispatch(
        addToast({
          type: 'success',
          title: 'Cadastro Realizado',
          description: 'Voce já pode fazer seu logon',
        }),
      )
      return navigate('/')
    },
    onError: e =>
      dispatch(
        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description: `Ocorreu um erro no cadastro: ${e}`,
        }),
      ),
  })

  const handleSubmit = useCallback(
    async (data: SignUpProp) => {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
      })

      await schema
        .validate(data, {
          abortEarly: false,
        })
        .then(
          response => {
            return mutate(response as SignUpProp)
          },
          e => {
            if (e instanceof Yup.ValidationError) {
              const errors = getValidationErrors(e)
              return formRef.current?.setErrors(errors)
            }
            return dispatch(
              addToast({
                type: 'error',
                title: 'Erro no cadastro.',
                description: `Ocorreu erro ao fazer cadastros`,
              }),
            )
          },
        )
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
