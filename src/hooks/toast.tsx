import { createContext, useContext, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ToastContainer } from '../components/ToastContainer'

export interface IToastMessage {
  id: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

interface IToastContextData {
  addToast(message: Omit<IToastMessage, 'id'>): void
  removeToast(id: string): void
}

interface IProps {
  children: JSX.Element
}

export const ToastContext = createContext<IToastContextData>(
  {} as IToastContextData,
)

export const ToastProvider: React.FC<IProps> = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = uuid()
      const toast = {
        id,
        type,
        title,
        description,
      }

      setMessages(oldMessages => [...oldMessages, toast])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export function useToast(): IToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
