import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import { ReactNode } from 'react'

interface IRouteProp {
  redirectTo: string
}

export const PrivateRoute: React.FC<IRouteProp> = ({
  children,
  redirectTo,
}) => {
  const { user } = useAuth()

  return user ? children : <Navigate to={redirectTo} />
}
