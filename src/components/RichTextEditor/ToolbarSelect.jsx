import { useState, useRef } from 'react'
import cn from 'classnames'

import useClickOutside from '@/hooks/useClickOutside'

import s from './toolbar.module.scss'

const caretDown = <svg xmlns="http://www.w3.org/2000/svg" className={s.fillSVG} viewBox="0 0 640 640"><path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"/></svg>

function ToolbarSelect({ value, onChange, options, renderOption, renderSelected }) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  useClickOutside(inputRef, () => setIsOpen(false), isOpen)
  
  const handleButtonClick = () => {
    setIsOpen((prev) => !prev)
  }
  const handleOptionClick = (value) => {
    setIsOpen(false)
    onChange(value)
  }
  const selectedOption = options.find(opt => opt.value.toLowerCase() === value.toLowerCase())

  const maxCharLength = !renderSelected ? Math.max(...options.map(o => o.label?.length)) + 1 : null
  
  return (
    <div ref={inputRef} className={s.selectWrapper}>
      <button className={s.toolbarSelect} style={{width: `calc(${maxCharLength}ch ${selectedOption.icon ? '+ 1.5em' : ''} + 1.25em)`}} onClick={() => handleButtonClick()}>
        <div className={s.left}>
          {selectedOption.icon}
          {selectedOption.label && <p>{selectedOption.label}</p>}
        </div>
        <div className={s.arrowIcon} aria-hidden='true'>
          {caretDown}
        </div>
      </button>
      {isOpen &&
        <ul className={cn('flex-col w-100', s.optionsList)}>
          {options.map(({ value: val, label, icon }) => (
            <li
              key={val}
              role='option'
              className={cn(s.option, { [s.selected]: value.toLowerCase() === val.toLowerCase() })}
              onClick={() => handleOptionClick(val)}
            >
              {icon}
              {label}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ToolbarSelect