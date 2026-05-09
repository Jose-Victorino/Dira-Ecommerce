import { useState } from 'react'
import { Link } from 'react-router'
import cn from 'classnames'

import s from './Button.module.scss'

const Button = (props) => {
  const {
    classNames = {},
    style={},
    btnType = 'primary',  // 'primary', 'secondary', 'tertiary', 'toggle'
    size = 'md',       // 'sm', 'md', 'lg'
    text = '',
    type = 'button',      // 'button', 'submit', 'reset'
    icon = null,
    iconPos = 'left',     // 'left', 'right'
    color = 'blue',       // 'blue', 'red', 'yellow', 'green', 'light', 'dark'
    corners = 'curved',   // 'sharp', 'curved', 'rounded'
    title,
    disabled = false,
    span = false,
    role = 'button',
    to,
    onClick = () => {},
  } = props
  if(!['primary', 'secondary', 'tertiary', 'toggle'].includes(btnType.toLowerCase()))
    console.error("btnType must only be: 'primary', 'secondary', 'tertiary', 'toggle'")
  if(!['sm', 'md', 'lg'].includes(size.toLowerCase()))
    console.error("btnType must only be: 'sm', 'md', 'lg'")
  if(!['button', 'submit', 'reset'].includes(type))
    console.error("type must only be: 'button', 'submit', 'reset'")
  if(!['left', 'right'].includes(iconPos.toLowerCase()))
    console.error("iconPos must only be: 'left', 'right'")
  if(!['curved', 'sharp', 'rounded'].includes(corners.toLowerCase()))
    console.error("corners must only be: 'sharp', 'curved', 'rounded'")

  const [toggleState, setToggleState] = useState(false)

  const isLink = role === 'link'
  const Component = isLink ? Link : 'button'

  if(btnType === 'toggle'){
    return (
      <button
        className={cn(
          s[`btn-${btnType.toLowerCase()}`],
          s[`sz-${size.toLowerCase()}`],
          s[`color-${color.toLowerCase()}`],
          { ...classNames },
        )}
        style={{ ...style }}
        data-toggle={toggleState}
        title={title}
        type="button"
        disabled={disabled}
        onClick={() => {
          onClick(toggleState)
          setToggleState((prev) => !prev)
        }}
        aria-label={title || 'Toggle button'}
        aria-pressed={toggleState}
        aria-disabled={disabled}
        role={role}
      >
        <div />
      </button>
    )
  }
  
  return (
    <Component
      className={cn(
        s[`btn-${btnType.toLowerCase()}`],
        s[`sz-${size.toLowerCase()}`],
        s[`color-${color.toLowerCase()}`],
        s[`corner-${corners.toLowerCase()}`],
        {
          ...classNames,
          [s.iconOnly]: !text && icon,
          ['flex-row']: icon && iconPos.toLowerCase() === 'left',
          ['flex-row-reverse']: icon && iconPos.toLowerCase() === 'right',
        },
      )}
      style={{
        ...style,
        width: span ? '100%' : 'fit-content',
      }}
      title={title}
      type={type}
      disabled={disabled}
      onClick={() => onClick()}
      aria-label={title || text}
      aria-disabled={disabled}
      role={role}
      to={isLink ? to : ''}
    >
      {icon}
      {text}
    </Component>
  )
}

export default Button