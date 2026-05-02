import { initialState } from './initialState'

export function setNestedValue(obj, path, value) {
  const keys = Array.isArray(path) ? [...path] : path.split('.')
  
  if(!keys.length) return obj
  
  const lastKey = keys.pop()
  const newObj = { ...obj }
  let current = newObj

  for(const key of keys){
    current[key] = { ...current[key] ?? {} }
    current = current[key]
  }

  current[lastKey] = value

  return newObj
}

export function reducer(state, action){
  switch (action.type){
    case 'SET':
      return setNestedValue(state, action.path, action.value)
    default:
      return state
  }
}

export { initialState }