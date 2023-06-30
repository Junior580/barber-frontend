import { Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/SignIn/index'
import { SignUp } from '../pages/SignUp/index'

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
)
