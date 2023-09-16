import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { api } from '../services/api'

type UserProp = {
  id: string
  name: string
  avatar_url: string
}

type AuthState = {
  token: string
  user: UserProp
}

type SignInProp = {
  email: string
  password: string
}

type AuthContextData = {
  user: UserProp
  signIn(credentials: SignInProp): Promise<void>
  signOut(): void
}
type AuthProviderProp = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProp> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInProp) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an authProvider')
  }

  return context
}
