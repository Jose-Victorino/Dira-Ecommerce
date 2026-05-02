import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export default function useQueryParams({ shape, onError = 'clear' }){
  const [searchParams, setSearchParams] = useSearchParams()
  const [isError, setIsError] = useState(true)

  const values = Object.entries(shape).reduce((acc, [key, schema = null]) => {
    let value = null
    const inferred = schema?.type
    
    if(inferred === 'number'){
      const temp = searchParams.get(key)
      const parsed = temp ? parseInt(temp) : null

      if(Number.isNaN(parsed)) setIsError(true)
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
      catch{ setIsError(true) } 
    }
    
    if(value !== null && schema){
      try{
        schema.validateSync(value)
      } catch{
        setIsError(true)
        value = null
      }
    }
    
    return { ...acc, ...(value != null ? { [key]: value } : {}) }
  }, {})
  
  useEffect(() => {
    if(!isError) return
    
    if(onError === 'clear')
      setSearchParams(new URLSearchParams())
  }, [isError, onError, searchParams, setSearchParams])

  const handleSetQuery = (params) => {
    const next = new URLSearchParams()
    Object.entries(params).forEach(([key, val]) => {
      if(val === null || val === undefined) return
      next.set(key, typeof val === 'object' ? JSON.stringify(val) : String(val))
    })
    setSearchParams(next)
  }

  return ([values, handleSetQuery])
}