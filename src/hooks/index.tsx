import { ReactNode } from 'react'

import { ToastProvider } from '../hooks/toast'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => (
  <ToastProvider>{children}</ToastProvider>
)

export default AppProvider
