import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from '../components/ToastContainer'
import { RootState } from '../redux/root-reducer'

type ToastProviderProp = {
  children: JSX.Element
}

export const ToastProvider: React.FC<ToastProviderProp> = ({ children }) => {
  const messages = useSelector((state: RootState) => state.toast.message)
  return (
    <>
      {children}
      <ToastContainer messages={[...messages]} />
    </>
  )
}
