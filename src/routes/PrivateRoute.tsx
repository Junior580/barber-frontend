import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

type RouteProps = {
  children?: ReactNode
  isPrivate?: boolean
}

export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  isPrivate = false,
}) => {
  const { user } = useAuth()

  // private NO user YES = false == navigate to /dashboard
  // private YES user NO = false == navigate to home

  // private YES user YES = true == children || outlet
  // private NO user NO = true == children || outlet

  return isPrivate === !!user ? (
    children || <Outlet />
  ) : (
    <Navigate to={user ? '/dashboard' : '/'} />
  )
}
