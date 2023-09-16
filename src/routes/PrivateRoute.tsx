import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

type RouteProps = {
  children?: ReactNode
  redirectTo?: string
}

export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  redirectTo = '/',
}) => {
  const { user } = useAuth()

  return user ? children || <Outlet /> : <Navigate to={redirectTo} />
}
