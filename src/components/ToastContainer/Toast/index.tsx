import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { ToastMessage } from '../../../hooks/toast'

import { Container } from './styles'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { removeToast } from '../../../redux/toast/slice'

interface IToastProps {
  message: ToastMessage
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
}

export const Toast: React.FC<IToastProps> = ({ message }) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(message.id))
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

      <button
        onClick={() => {
          dispatch(removeToast(message.id))
        }}
        type="button"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}
