import { useState } from 'react'

function useToggle(def = false) {
  const [value, setValue] = useState(def)

  if(typeof def !== 'boolean')
    console.error('Default value must be Boolean.')

  return ({
    value,
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    toggle: () => setValue(p => !p),
  })
}

export default useToggle