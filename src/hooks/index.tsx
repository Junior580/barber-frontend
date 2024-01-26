import { ReactNode } from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from '../hooks/toast'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider
