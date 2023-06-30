import { Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/SignIn/index'
import { SignUp } from '../pages/SignUp/index'
import { PrivateRoute } from './PrivateRoute'
import { Dashboard } from '../pages/Dashboard'

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />

    <Route
      path="/dashboard"
      element={
        <PrivateRoute redirectTo="/">
          <Dashboard />
        </PrivateRoute>
      }
    />
  </Routes>
)
