import { useRef } from 'react'

import s from './QuantityInput.module.scss'

const minusSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/></svg>
const plusSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

function QuantityInput({id, state, setState, min}) {
  const inputRef = useRef(null)
  
  const handleQuantityChange = (dir) => {
    const next = Math.max(min || 0, state + dir)
    setState(next)
    inputRef.current.value = next
  }

  return (
    <div className={s.quantityInput}>
      <button onClick={() => handleQuantityChange(-1)}>
        {minusSVG}
      </button>
      <div className={s.inputCont}>
        <input
          ref={inputRef}
          type="number"
          name={`quantity-${id}`}
          min={min || 0}
          max={99}
          value={state}
          onChange={(e) => setState(parseInt(e.target.value))}
        />
      </div>
      <button onClick={() => handleQuantityChange(1)}>
        {plusSVG}
      </button>
    </div>
  )
}

export default QuantityInput