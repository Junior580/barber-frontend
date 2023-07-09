import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { ReactNode } from 'react'

interface IRouteProp {
  children?: ReactNode
  redirectTo?: string
}

export const PrivateRoute: React.FC<IRouteProp> = ({
  children,
  redirectTo = '/',
}) => {
  const { user } = useAuth()

  return user ? children || <Outlet /> : <Navigate to={redirectTo} />
}
