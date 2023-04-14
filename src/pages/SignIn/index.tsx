import LogoImg from '../../assets/logo.svg'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <Content>
          <img src={LogoImg} alt="GoBarber" />
          <form>
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
          </form>

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
