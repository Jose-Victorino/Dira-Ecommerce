import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import QuantityInput from '@/components/QuantityInput/QuantityInput'

import { formatToCurrency } from '@/library/Util'

import s from './Cart.module.scss'
import Skeleton from 'react-loading-skeleton'
import CartSkeleton from './CartSkeleton'

const PAGE_NAME = 'Cart'

const trashSVG = <svg viewBox="0 0 24 24" fill="none" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>

const CartItem = ({item}) => {
  const cart = useCart()
  const variationText = Object.entries(item?.attributes)
    .reduce((prev, [name, attr]) => {
      return [...prev, `${name}: ${attr}`]
    }, []).join(', ') ?? ''

  return (
    <tr className={cn({[s.outOfStock]: item.stock === 0})}>
      <td>
        <div className={cn('flex gap-10', s.product)}>
          <img src='qwdw' className={s.img} loading='lazy' alt={item.name} />
          <div className='w-100'>
            <p>{item.product_name}</p>
            {variationText &&
              <p className={s.variation}>
                {variationText}
              </p>
            }
            <p>{formatToCurrency(item.price)}</p>
          </div>
        </div>
      </td>
      <td>
        <div className='flex a-center gap-10'>
          <QuantityInput
            id={item.variant_id}
            state={item.quantity}
            min={1}
            setState={(val) => cart.updateQuantity(item.id, val)}
          />
          <button className='flex' onClick={() => cart.remove(item.id)}>{trashSVG}</button>
        </div>
      </td>
      <td>
        <p>{formatToCurrency(item.price * item.quantity)}</p>
      </td>
    </tr>
  )
}

function Cart() {
  const { data, isLoading, totalQuantity, total } = useCart()
  useDocumentTitle(`${PAGE_NAME} | Dira`)
  
  const LoadCart = () => {
    if(isLoading) return <CartSkeleton />

    if(!data?.length) return (
      <div className='container pad-block-30' style={{minHeight: 320}}>
        <p className='text-center'>Your cart is empty</p>
      </div>
    )

    return (
      <>
        <section className='container'>
            <table className={s.cartTable}>
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </tbody>
              <tbody>
                {data.map((c) =>
                  <CartItem key={c.id} item={c} />
                )}
              </tbody>
            </table>
        </section>
        <section className={cn('container flex j-end pad-15', s.bottom)}>
          <div className='flex a-center gap-15'>
            <strong>Total: ({totalQuantity} items)</strong>
            <strong className={s.total}>{formatToCurrency(total)}</strong>
            <Button
              text='Checkout'
              onClick={() => {}}
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='flex-col gap-10 pad-block-40'>
      <section className='container flex j-space-between'>
        <h4>Your Cart</h4>
        <Link to='/shop' className={s.shopLink}>Continue Shopping</Link>
      </section>
      <LoadCart />
    </div>
  )
}

export default Cart