import GlobalStyle from '../../styles/global'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'
import { Admin } from '../Admin'

import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'
import { ToastProvider } from '../../hooks/toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30,
    },
  },
})

export const App: React.FC = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/*" element={<ResetPassword />} />

          <Route path="/dashboard/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ToastProvider>
    </QueryClientProvider>
    <GlobalStyle />
  </BrowserRouter>
)
