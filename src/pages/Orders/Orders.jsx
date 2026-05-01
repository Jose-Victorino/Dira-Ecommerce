import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Orders.module.scss'

const PAGE_NAME = 'Orders'

function Orders() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>Orders</div>
  )
}

export default Orders