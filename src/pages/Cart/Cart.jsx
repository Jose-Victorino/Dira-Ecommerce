import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Cart.module.scss'

const PAGE_NAME = 'Cart'

function Cart() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>Cart</div>
  )
}

export default Cart