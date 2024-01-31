import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'

import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'
import { PrivateRoute } from '../../routes/PrivateRoute'
import { Dashboard } from '../Admin/Dashboard'

export const App: React.FC = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/*" element={<ResetPassword />} />
    </Route>
    <Route element={<PrivateRoute isPrivate />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)
