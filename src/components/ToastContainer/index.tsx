import React from 'react'

import { Toast } from './Toast/index'

import { IToastMessage } from '../../hooks/toast'
import { Container } from './styles'

interface IToastContainerProps {
  messages: IToastMessage[]
}

export const ToastContainer: React.FC<IToastContainerProps> = ({
  messages,
}) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}
