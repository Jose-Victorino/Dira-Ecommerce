import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Shop.module.scss'

const PAGE_NAME = 'Shop'

function Shop() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>Shop</div>
  )
}

export default Shop