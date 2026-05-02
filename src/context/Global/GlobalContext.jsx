import { useMemo, useReducer } from 'react'

import { GlobalContext } from './Global.context'
import { reducer, initialState } from './Global.store'

function GlobalProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider