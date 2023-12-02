import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthService from '../../services/auth.service'

type signInProps = {
  email: string
  password: string
}

type UserProps = {
  id: string
  name: string
  avatar_url: string
}

type AuthState = {
  token: string | null
  user: UserProps | null
  status: 'rejected' | 'fulfilled' | null
  error: string | undefined
}

const token = localStorage.getItem('@GoBarber:token')
const user = localStorage.getItem('@GoBarber:user')

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  status: null,
  error: undefined,
}

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: signInProps) => {
    return AuthService.login({ email, password }).then(
      response => {
        return Promise.resolve(response)
      },
      error => {
        return Promise.reject(error)
      },
    )
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      localStorage.removeItem('@GoBarber:token')
      localStorage.removeItem('@GoBarber:user')
      state.token = null
      state.user = null
      state.error = 'null'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.error = ''
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.token = null
        state.user = null
        state.error = action.error.message as string
      })
  },
})

export const { signOut } = authSlice.actions

export default authSlice.reducer
