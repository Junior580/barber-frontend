import { createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'
import { Admin } from '../Admin'

import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/*',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard/*',
    element: <Admin />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
