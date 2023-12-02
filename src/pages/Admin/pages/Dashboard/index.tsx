import { useState } from 'react'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles'

import logoImg from '../../../../assets/logo.svg'

import { FiPower } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { RootState } from '../../../../redux/root-reducer'
import { signOut } from '../../../../redux/auth/slice'

export const Dashboard: React.FC = () => {
  const { auth } = useSelector((state: RootState) => state)

  const dispatch = useDispatch<AppDispatch>()


  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{auth.user?.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={() => dispatch(signOut())}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/93562736?v=4"
                alt="Img teste"
              />
              <strong>Diego fernandes</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manha</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/93562736?v=4"
                  alt="Img teste"
                />
                <strong>Diego fernandes</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/93562736?v=4"
                  alt="Img teste"
                />
                <strong>Diego fernandes</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/93562736?v=4"
                  alt="Img teste"
                />
                <strong>Diego fernandes</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}
