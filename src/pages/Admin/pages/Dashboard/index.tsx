import { Container, Header, HeaderContent, Profile } from './styles'

import logoImg from '../../../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import { useAuth } from '../../../../hooks/auth'

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  console.log(user)
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src="https://scontent.fssz10-1.fna.fbcdn.net/v/t39.30808-6/360097343_287949497083061_5444532881078325434_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Wb_YImdXRfMAX8e4S9i&_nc_ht=scontent.fssz10-1.fna&oh=00_AfCagUkUUFlMIoFV_DuiyneTiUh28DPYQb3srxEes1jM8w&oe=64BA25CF"
              alt="diego"
            />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
}
