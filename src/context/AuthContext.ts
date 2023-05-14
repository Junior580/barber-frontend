import { createContext } from 'react'

interface IAuthContext {
  name: string
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
