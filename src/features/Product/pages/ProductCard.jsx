import { Link } from 'react-router'

import { formatToCurrency, scrollReset } from '@/library/Util'

import ImageSlider from '@/features/Product/components/ImageSlider'

import s from './ProductCard.module.scss'

function ProductCard({ product }) {
  const isOutOfStock = product.variants.map(v => v.stock).every(s => s === 0)

  const formattedPrice = () => {
    if(product.variants?.length === 1) return formatToCurrency(product.variants[0].price)

    const prices = product.variants.filter(v => v.stock > 0).map(v => v.price)
    const minPrice = formatToCurrency(Math.min(...prices))
    const maxPrice = formatToCurrency(Math.max(...prices))

    return minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`
  }

  return (
    <Link to={`/products/${product.slug}`} className='flex-col gap-10 pos-r' onClick={(e) => { e.stopPropagation(); scrollReset()}}>
      <ImageSlider id={product.id} cards={product.images} productName={product.name} enableArrow={false}/>
      <div>
        <p>{product.name}</p>
        <p>{formattedPrice()}</p>
      </div>
      {isOutOfStock &&
        <div className={s.outOfStock}>
          <p>Out of Stock</p>
        </div>
      }
    </Link>
  )
}

export default ProductCard