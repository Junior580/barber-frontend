import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

type ToastMessage = {
  id?: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

type ToastState = {
  message: ToastMessage[]
}

const initialState: ToastState = {
  message: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastMessage>) => {
      const { type, title, description } = action.payload

      const id = uuid()
      const toast = {
        id,
        type,
        title,
        description,
      }

      state.message = [...state.message, toast]
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.message = state.message.filter(toast => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions

export default toastSlice.reducer
