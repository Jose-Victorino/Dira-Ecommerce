import cn from 'classnames'

import s from './Input.module.scss'

import PasswordInput from './Password'
import SelectInput from './Select'
import MultiselectInput from './MultiSelect'

const RenderInput = (props) => {
  const { type, ...rest } = props

  switch (type){
    case 'password':
      return <PasswordInput {...props} />
    case 'select':
      return <SelectInput {...props} type='text' />
    case 'multiselect':
      return <MultiselectInput {...props} type='text' />
    case 'textarea':
      return <textarea {...rest}/>
    default:
      return <input type={type} {...rest} />
  }
}

const hasInputValue = (value) => {
  if(value === null || value === undefined) return false
  if(typeof value === 'string') return value.trim().length > 0
  if(Array.isArray(value)) return value.length > 0
  return true
}

function Input(props) {
  const { type = 'text', error, touched, name, id, displayName, value, placeholder, required, className, labelOutside = false, span, onChange = () => {}, onBlur = () => {}, ...rest } = props

  if(['image', 'checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color'].includes(type)) return null

  const inputId = id ?? name
  const showError = Boolean(error && touched)
  const errorId = showError ? `${inputId}-error` : undefined
  const isFloatingLabelTop = hasInputValue(value) || ['date', 'time', 'file'].includes(type)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')

  return (
    <div className={cn('flex-col gap-5', s.inputCont, { [s.toTop]: isFloatingLabelTop, [s.span]: span })}>
      <div className='pos-r flex-col'>
        {displayName &&
          <span className={cn(s.textLabel, { [s.labelInside]: !labelOutside})}>
            {displayName}
            {required &&
              <span className={s.required} aria-hidden>*</span>
            }
          </span>
        }
        <label htmlFor={props.id} className={s.input}>
          <RenderInput
            {...rest}
            type={type}
            id={inputId}
            name={name}
            {...(isControlled ? { value } : {})}
            placeholder={((labelOutside && displayName) || !displayName) ? placeholder : null}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={cn(className, { [s.error]: showError })}
            aria-invalid={showError}
            aria-describedby={errorId}
          />
        </label>
      </div>
      {showError &&
        <span id={errorId} className={s.errorMsg} role='alert'>
          {error}
        </span>
      }
    </div>
  )
}

export default Input
