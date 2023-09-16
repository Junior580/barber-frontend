import React from 'react'

import { Toast } from './Toast/index'

import { ToastMessage } from '../../hooks/toast'
import { Container } from './styles'

interface IToastContainerProps {
  messages: ToastMessage[]
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
