import { Navigate, createBrowserRouter } from 'react-router-dom'

import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'

import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'
import { PrivateRoute } from '../../routes/PrivateRoute'
import { Dashboard } from '../Admin/Dashboard'
import Profile from '../Admin/Profile'

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
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
    ],
  },
  {
    element: <PrivateRoute isPrivate />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
