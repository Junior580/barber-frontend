import React from 'react'
import { IToastMessage } from '../../hooks/toast'
import { Toast } from './Toast/index'

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
