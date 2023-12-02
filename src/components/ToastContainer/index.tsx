import React from 'react'

import { Toast } from './Toast/index'

import { Container } from './styles'

type ToastMessage = {
  id: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

type ToastContainerProps = {
  messages: ToastMessage[]
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}
