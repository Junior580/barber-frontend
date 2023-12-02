import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/root-reducer'

type RouteProps = {
  children?: ReactElement
  redirectTo?: string
}

export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  redirectTo = '/',
}) => {
  const { user } = useSelector((selector: RootState) => selector.auth)

  return user ? children || <Outlet /> : <Navigate to={redirectTo} />
}
