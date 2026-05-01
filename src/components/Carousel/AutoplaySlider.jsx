import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import cn from 'classnames'

import s from './AutoplaySlider.module.scss'

function AutoplaySlider({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
  }, [Autoplay({ delay: 5_000, playOnInit: true })])

  const [scrollSnaps, setScrollSnaps] = useState([])
  const [selectedSnap, setSelectedSnap] = useState(0)
  
  const scrollTo = (index) => emblaApi?.scrollTo(index)
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())
  const setActiveSnap = (emblaApi) => setSelectedSnap(emblaApi.selectedScrollSnap())

  useEffect(() => {
    if(!emblaApi) return

    setupSnaps(emblaApi)
    setActiveSnap(emblaApi)

    emblaApi.on('reInit', setupSnaps)
    emblaApi.on('reInit', setActiveSnap)
    emblaApi.on('select', setActiveSnap)
  }, [emblaApi])

  return (
    <div className={cn('pos-r flex w-100 h-100', s.slider)}>
      <div className={cn('w-100 h-100', s.viewport)} ref={emblaRef}>
        <ul className={cn('flex h-100', s.slideList)}>
          {images.map((img, i) =>
            <li key={i}>
              <img src={img} alt='img' />
            </li>
          )}
        </ul>
      </div>
      <div className={s.dotList}>
        {scrollSnaps.map((_, index) =>
          <button
            className={cn(s.dot, {[s.selected]: index === selectedSnap})}
            key={index}
            onClick={() => scrollTo(index)}
          />
        )}
      </div>
    </div>
  )
}

export default AutoplaySlider