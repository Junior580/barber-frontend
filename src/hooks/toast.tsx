import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from '../components/ToastContainer'
import { RootState } from '../redux/root-reducer'

export type ToastMessage = {
  id: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

type ToastProviderProp = {
  children: JSX.Element
}

export const ToastProvider: React.FC<ToastProviderProp> = ({ children }) => {
  const messages = useSelector<RootState>(
    state => state.toast.message,
  ) as ToastMessage[]

  return (
    <>
      {children}
      <ToastContainer messages={[...messages]} />
    </>
  )
}
