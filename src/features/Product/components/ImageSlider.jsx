import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import cn from 'classnames'

import s from './ImageSlider.module.scss'

const prevSVG = <svg xmlns="http://www.w3.org/2000/svg" className='svg-md' viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
const nextSVG = <svg xmlns="http://www.w3.org/2000/svg" className='svg-md' viewBox="0 0 640 640"><path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/></svg>

function ImageSlider({ id, cards = [], productName = '', activeVariantIds = [] }) {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [selectedSnap, setSelectedSnap] = useState(0)

  const carouselId = `${id ? `${id}-` : ''}product-carousel`

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
    align: 'start',
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const scrollTo = (index) => emblaApi?.scrollTo(index)
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())
  const setActiveSnap = (emblaApi) => setSelectedSnap(emblaApi.selectedScrollSnap())

  useEffect(() => {
    if(!emblaApi) return

    const updateButtons = () => {
      if(!emblaApi) return
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    updateButtons()
    setupSnaps(emblaApi)
    setActiveSnap(emblaApi)

    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)
    emblaApi.on('reInit', setupSnaps)
    emblaApi.on('reInit', setActiveSnap)
    emblaApi.on('select', setActiveSnap)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
      emblaApi.off('reInit', setupSnaps)
      emblaApi.off('reInit', setActiveSnap)
      emblaApi.off('select', setActiveSnap)
    }
  }, [emblaApi])

  useEffect(() => {
    if(!emblaApi || activeVariantIds.length === 0) return

    const index = cards.findIndex(card =>
      card.variant_ids.some(vid => activeVariantIds.includes(vid))
    )

    if(index !== -1) emblaApi.scrollTo(index)
  }, [activeVariantIds, emblaApi, cards])

  return (
      <div
        className={cn('pos-r flex-col w-100', s.slider)}
        role='region'
        aria-roledescription='carousel'
        aria-label='Product carousel'
      >
        <div>
          <button
            className={s.prev}
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-controls={carouselId}
            aria-label='Prev Product'
          >
            {prevSVG}
          </button>
          <button
            className={s.next}
            onClick={scrollNext}
            disabled={!canNext}
            aria-controls={carouselId}
            aria-label='Next Product'
          >
            {nextSVG}
          </button>
        </div>
        <div
          className={s.viewport}
          ref={emblaRef}
          id={carouselId}
          aria-live='polite'
        >
          <ul className={s.slideList}>
            {cards.map((p, i) =>
              <li
                key={p.id}
                className='flex-col gap-10'
                role='group'
                aria-roledescription='slide'
                aria-label={`Slide ${i + 1} of ${cards.length}`}
              >
                <img src={p.path} loading='lazy' alt={productName} />
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

export default ImageSlider