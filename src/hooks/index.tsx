import { ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
