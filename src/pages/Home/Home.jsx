import { Link } from 'react-router'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Carousel from '@/components/Carousel/Carousel'

import s from './Home.module.scss'
import AutoplaySlider from '@/components/Carousel/AutoplaySlider'

import cat1 from '@/assets/E104JFHN.jpg'
import cat2 from '@/assets/E10A101X.jpg'
import cat3 from '@/assets/E104HBPF.jpg'
import cat4 from '@/assets/E109CJUS.jpg'
import cat5 from '@/assets/E104BCFL.jpg'
import cat6 from '@/assets/E10JG0H0.jpg'
import cat7 from '@/assets/E10597EA.jpg'
import bottomImg from '@/assets/E10IS1UP.jpg'
import { productService } from '@/service/crudService.tanstack'

const IMAGES = [cat1, cat2, cat3, cat4, cat5, cat6, cat7]

function Home() {
  useDocumentTitle(`Dira`)

  const resTrending = productService.getList({path: 'trending'})
  const resNewArrival = productService.getList({path: 'newArrival'})

  return (
    <>
      <section className={s.hero}>
        <AutoplaySlider images={IMAGES}/>
      </section>
      <section className='pad-block-60'>
        <div className='container flex-col a-end gap-10'>
          <h3 className='text-center w-100'>Now Trending</h3>
          <Carousel
            id='now-trending'
            cards={resTrending.data}
            isLoading={resTrending.isLoading}
          />
        </div>
      </section>
      <section className='pad-block-60'>
        <div className='container flex-col gap-15'>
          <h4>Browse by Category</h4>
          <div className={s.categoryCont}>
            <ul className={s.categoryList}>
              <li>
                <Link to='/shop?category=lifestyle'>Lifestyle</Link>
              </li>
              <li>
                <Link to='/shop?category=sports'>Sports</Link>
              </li>
              <li>
                <Link to='/shop?category=running'>Running</Link>
              </li>
              <li>
                <Link to='/shop?category=slides'>Slides</Link>
              </li>
              <li>
                <Link to='/shop?category=laces'>Laces</Link>
              </li>
              <li>
                <Link to='/shop?category=shoe-care'>Shoe Care</Link>
              </li>
            </ul>
            <div className={s.sliderCont}>
              <AutoplaySlider images={IMAGES}/>
            </div>
          </div>
        </div>
      </section>
      <section className='pad-block-60'>
        <div className='container flex-col a-end gap-10'>
          <h3 className='text-center w-100'>New Arrivals</h3>
          <Carousel
            id='now-trending'
            cards={resNewArrival.data}
            isLoading={resNewArrival.isLoading}
          />
        </div>
      </section>
      <section
        className={s.parallaxCont}
        style={{ backgroundImage: `url(${bottomImg})` }}
      />
    </>
  )
}

export default Home