import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import ProductCard from '@/components/ProductCard/ProductCard'

import s from './Shop.module.scss'

const PAGE_NAME = 'Shop'

function Shop() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <>
      <div>
        <h5>Filters</h5>
      </div>
      <div>
        <div>
          <div>
            <p>Sort By</p>
          </div>

        </div>
        <div>
          <ul>
            {/* <ProductCard /> */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Shop