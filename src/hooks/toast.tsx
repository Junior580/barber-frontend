import { createContext, useContext, useCallback } from 'react'
import { ToastContainer } from '../components/ToastContainer'

interface IToastContextData {
  addToast(): void
  removeToast(): void
}

interface IProps {
  children: JSX.Element
}

export const ToastContext = createContext<IToastContextData>(
  {} as IToastContextData,
)

export const ToastProvider: React.FC<IProps> = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast')
  }, [])
  const removeToast = useCallback(() => {
    console.log('remove')
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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
