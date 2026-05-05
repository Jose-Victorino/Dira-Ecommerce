import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function useQueryParams({ shape, onError = 'clear' }){
  const [searchParams, setSearchParams] = useSearchParams()
  let hasError = false

  const values = Object.entries(shape).reduce((acc, [key, schema = null]) => {
    let value = null
    const inferred = schema?.type
    
    if(inferred === 'number'){
      const temp = searchParams.get(key)
      const parsed = temp ? parseInt(temp) : null

      if(Number.isNaN(parsed)) hasError = true
      else value = parsed
    }
    if(inferred === 'string'){
      value = searchParams.get(key)
    }
    if(inferred === 'array'){
      value = searchParams.getAll(key)
    }
    if(inferred === 'object'){
      const temp = searchParams.get(key)
      try{ value = JSON.parse(temp) }
      catch{ hasError = true } 
    }
    
    if(value !== null && schema){
      try{
        schema.validateSync(value)
      } catch{
        hasError = true
        value = null
      }
    }
    
    return { ...acc, ...(value != null ? { [key]: value } : {}) }
  }, {})
  
  useEffect(() => {
    if(!hasError) return
    
    if(onError === 'clear')
      setSearchParams(new URLSearchParams())
  }, [hasError, onError, searchParams, setSearchParams])

  const handleSetQuery = (params) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      Object.entries(params).forEach(([key, val]) => {
        if(val == null || val === ''){
          next.delete(key)
        }
        else{
          next.set(key, typeof val === 'object' ? JSON.stringify(val) : String(val))
        }
      })

      return next
    })
  }

  return ([values, handleSetQuery])
}