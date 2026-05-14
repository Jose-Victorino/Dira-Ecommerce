import { Link } from 'react-router'
import cn from 'classnames'

import Skeleton from 'react-loading-skeleton'
import Button from '@/components/Button/Button'

import { formatToCurrency } from '@/library/Util'

import s from './Cart.module.scss'

const CartItem = () => (
  <tr>
    <td>
      <div className={cn('flex gap-10', s.product)}>
        <Skeleton className={s.img} />
        <div className='w-100'>
          <Skeleton width='30%' height='1.5em' />
          <Skeleton width='50%' height='1.5em' />
          <Skeleton width='20%' height='1.5em' />
        </div>
      </div>
    </td>
    <td>
      <div className='flex a-center gap-10'>
        <Skeleton
          width={90}
          height='2em'
          borderRadius={3}
        />
        <Skeleton
          width='1.5em'
          height='1.5em'
        />
      </div>
    </td>
    <td>
      <Skeleton width='50%' height='1.5em' />
    </td>
  </tr>
)

function CartSkeleton() {

  return (
    <>
      <section className='container'>
          <table className={s.cartTable}>
            <tbody>
              <tr>
                <th>
                  <Skeleton width='80px' height='1.5em' />
                </th>
                <th>
                  <Skeleton width='80px' height='1.5em' />
                </th>
                <th>
                  <Skeleton width='80px' height='1.5em' />
                </th>
              </tr>
            </tbody>
            <tbody>
              <CartItem />
              <CartItem />
            </tbody>
          </table>
      </section>
      <section className={cn('container flex j-end pad-15', s.bottom)}>
        <div className='flex a-center gap-15'>
          <Skeleton width='80px' height='1.5em' />
          <Skeleton width='80px' height='1.5em' />
          <Skeleton
            height='2.625em'
            width='100px'
            borderRadius={6}
          />
        </div>
      </section>
    </>
  )
}

export default CartSkeleton