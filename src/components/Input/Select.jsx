import { useState, useEffect, useMemo, useRef } from 'react'
import cn from 'classnames'

import s from './Select.module.scss'

const caretDown = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z"/></svg>
const MODE = { IDLE: 'idle', OPEN: 'open', TYPING: 'typing' }

function Select({ name, value = '', options, onChange, onBlur, className, ...rest }){
  const [mode, setMode] = useState(MODE.IDLE)
  const inputRef = useRef(null)
  const isOpen = mode !== MODE.IDLE

  const entries = Object.entries(options)

  const filteredOptions = useMemo(() => {
    if(mode !== MODE.TYPING) return entries

    return entries.filter(([, v]) => v.toLowerCase().includes(value.toLowerCase()))
  }, [options, value])
  
  
  useEffect(() => {
    if(!isOpen) return
    const handleClickOutside = (e) => {
      if(!inputRef.current?.contains(e.target))
        setMode(MODE.IDLE)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  const handleFocus = () => {
    setMode(MODE.OPEN)
  }

  const handleChange = (e) => {
    onChange(e)
    setMode(MODE.TYPING)
  }

  const handleBlur = (e) => {
    onBlur(e)
    setMode(MODE.IDLE)
  }

  const handleOptionClick = (val) => {
    onChange({ target: { name, value: val } })
  }

  return (
    <>
      <div className='flex w-100'>
        <input
          ref={inputRef}
          type='text'
          name={name}
          value={value}
          className={className}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
          autoComplete='off'
        />
        <div className={cn(s.arrowIcon, 'flex a-center')} aria-hidden='true'>
          {caretDown}
        </div>
      </div>
      {isOpen &&
        <ul className={cn('flex-col gap-5 w-100', s.optionsList)}>
          {filteredOptions.length > 0 ?
            filteredOptions.map(([key, val]) => (
              <li
                key={key}
                role='option'
                className={cn(s.option, { [s.selected]: value === val })}
                onMouseDown={() => handleOptionClick(val)}
              >
                {val}
              </li>
            ))
            : <li className={s.noOptions}>No matching options</li>
          }
        </ul>
      }
    </>
  )
}

export default Select