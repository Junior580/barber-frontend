import { ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

interface IProp {
  children: ReactNode
}

export const AppProvider: React.FC<IProp> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
