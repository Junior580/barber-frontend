import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { Container } from './styles'
import { useEffect } from 'react'
import { useToast } from '../../../hooks/toast'

type ToastMessage = {
  id: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

type ToastProps = {
  message: ToastMessage
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [message.id, removeToast])

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}{' '}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}
