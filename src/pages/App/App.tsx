import GlobalStyle from '../../styles/global'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from '../../hooks'
import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'
import { Admin } from '../Admin'
import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'

export const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />

        <Route path="/dashboard/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
)
