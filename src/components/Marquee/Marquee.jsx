import { useState, useEffect, useRef } from 'react' 

import s from './Marquee.module.scss'

function Marquee({ text = '' }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  const [items, setItems] = useState([text, text])
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if(!container || !track) return

    const singleWidth = track.firstChild?.offsetWidth || 0
    if(!singleWidth) return

    const needed = Math.ceil(container.offsetWidth / singleWidth) + 1

    const content = Array(needed).fill(text)
    setItems([...content, ...content])

    requestAnimationFrame(() => {
      setWidth(track.scrollWidth / 2)
    })
  }, [text])

  const duration = width / 45

  return (
    <div ref={containerRef} className={s.marquee}>
      <div
        ref={trackRef}
        className={s.track}
        style={{'--distance': `${width}px`, animationDuration: `${duration}s`}}
      >
        {items.map((t, i) => <p key={i}>{t}</p>)}
      </div>
    </div>
  )
}

export default Marquee