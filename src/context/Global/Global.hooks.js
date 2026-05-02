import { useContext } from 'react'
import { GlobalContext } from './Global.context'

export function useGlobal() {
  const { state, dispatch } = useContext(GlobalContext)

  const set = (path, value) => {
    dispatch({ type: 'SET', path, value })
  }

  return { state, set }
}