import { Link } from 'react-router'

import s from './ProductCard.module.scss'

function ProductCard({ product }) {
  const num = parseFloat(product.price)
  const formattedPrice = `₱${isNaN(num)
    ? '0.00'
    : num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`

  return (
    <Link to={`/products/${product.slug}`} className='flex-col gap-10'>
      <div className='flex'>
        <img className={s.img} src={product.image_path} alt={product.name} />
      </div>
      <div>
        <p>{product.name}</p>
        <p>{formattedPrice}</p>
      </div>
    </Link>
  )
}

export default ProductCard