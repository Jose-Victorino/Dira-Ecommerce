import { createContext, useContext } from 'react'

export const ModalContext = createContext()

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside Modal')
  return ctx
}