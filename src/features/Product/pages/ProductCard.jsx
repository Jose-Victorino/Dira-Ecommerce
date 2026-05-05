import { Link } from 'react-router'

import { formatToCurrency, scrollReset } from '@/library/Util'

import s from './ProductCard.module.scss'

function ProductCard({ product }) {
  const num = parseFloat(product.price)

  return (
    <Link to={`/products/${product.slug}`} className='flex-col gap-10' onClick={() => scrollReset()}>
      <div className='flex'>
        <img className={s.img} src={product.image_path} alt={product.name} />
      </div>
      <div>
        <p>{product.name}</p>
        <p>{formatToCurrency(num)}</p>
      </div>
    </Link>
  )
}

export default ProductCard