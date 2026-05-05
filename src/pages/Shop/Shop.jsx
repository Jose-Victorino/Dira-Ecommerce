import { useState } from 'react'
import useQueryParams from '@/hooks/useQueryParams'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import ProductCard from '@/features/Product/pages/ProductCard'
import OptionItem from '@/components/OptionItem/OptionItem'
import Input from '@/components/Input/Input'

import s from './Shop.module.scss'
import * as Yup from 'yup'

const PAGE_NAME = 'Shop'

const PRODUCTS = [
  {id: 1, name: 'Nike Air Max dimsum1', slug: 'nike-air-max', price: 1000},
  {id: 2, name: 'Nike Air Max dimsum2', slug: 'nike-air-max', price: 1000},
  {id: 3, name: 'Nike Air Max dimsum3', slug: 'nike-air-max', price: 1000},
  {id: 4, name: 'Nike Air Max dimsum4', slug: 'nike-air-max', price: 1000},
  {id: 5, name: 'Nike Air Max dimsum5', slug: 'nike-air-max', price: 1000},
  {id: 6, name: 'Nike Air Max dimsum6', slug: 'nike-air-max', price: 1000},
  {id: 7, name: 'Nike Air Max dimsum7', slug: 'nike-air-max', price: 1000},
  {id: 8, name: 'Nike Air Max dimsum8', slug: 'nike-air-max', price: 1000},
]
const SORT_OPTIONS = {
  latest: 'Latest',
  priceAsc: 'Price (Low to High)',
  priceDesc: 'Price (High to Low)',
  alphaAsc: 'Alphabetical (A-Z)',
  alphaDesc: 'Alphabetical (Z-A)',
}
const GENDER_FILTER = [
  {label: 'Man',    value: 'man'},
  {label: 'Woman',  value: 'woman'},
]
const CATEGORY_FILTER = [
  {label: 'Lifestyle',  value: 'lifestyle'},
  {label: 'Sports',     value: 'sport'},
  {label: 'Running',    value: 'running'},
  {label: 'Slides',     value: 'slides'},
  {label: 'Laces',      value: 'laces'},
  {label: 'Shoe Care',  value: 'shoe care'},
]
const SIZE_FILTER = [
  {label: 'US 4',     value: 'us_4'},
  {label: 'US 4.5',   value: 'us_4.5'},
  {label: 'US 5',     value: 'us_5'},
  {label: 'US 5.5',   value: 'us_5.5'},
  {label: 'US 6',     value: 'us_6'},
  {label: 'US 6.5',   value: 'us_6.5'},
  {label: 'US 7',     value: 'us_7'},
  {label: 'US 7.5',   value: 'us_7.5'},
  {label: 'US 8',     value: 'us_8'},
  {label: 'US 8.5',   value: 'us_8.5'},
  {label: 'US 9',     value: 'us_9'},
  {label: 'US 9.5',   value: 'us_9.5'},
  {label: 'US 10',    value: 'us_10'},
  {label: 'US 10.5',  value: 'us_10.5'},
  {label: 'US 11',    value: 'us_11'},
  {label: 'US 11.5',  value: 'us_11.5'},
  {label: 'US 12',    value: 'us_12'},
]
const COLOR_FILTER = [
  {label: 'Beige',    value: 'beige'},
  {label: 'Black',    value: 'black'},
  {label: 'Blue',     value: 'blue'},
  {label: 'Brown',    value: 'brown'},
  {label: 'Gray',     value: 'gray'},
  {label: 'Green',    value: 'green'},
  {label: 'Orange',   value: 'orange'},
  {label: 'Pink',     value: 'pink'},
  {label: 'Purple',   value: 'purple'},
  {label: 'Red',      value: 'red'},
  {label: 'White',    value: 'white'},
  {label: 'Yellow',   value: 'yellow'},
]

const GENDER = ['man', 'woman']
const CATEGORY = ['lifestyle', 'sport', 'running', 'slides', 'laces', 'shoe care']
const SIZE = ['us_4', 'us_4.5', 'us_5', 'us_5.5', 'us_6', 'us_6.5', 'us_7', 'us_7.5', 'us_8', 'us_8.5', 'us_9', 'us_9.5', 'us_10', 'us_10.5', 'us_11', 'us_11.5', 'us_12']
const COLOR = ['beige', 'black', 'blue', 'brown', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'white', 'yellow']

function Shop() {
  const [filters, setFilters] = useQueryParams({
    shape: {
      gender: Yup.string().oneOf(GENDER).optional(),
      category: Yup.string().oneOf(CATEGORY).optional(),
      priceMin: Yup.number().min(0).optional(),
      priceMax: Yup.number().min(0).optional(),
      size: Yup.string().oneOf(SIZE).optional(),
      color: Yup.string().oneOf(COLOR).optional(),
    }
  })
  const [priceRange, setPriceRange] = useState({ min: filters.priceMin, max: filters.priceMax })
  const [sort, setSort] = useState('latest')

  useDocumentTitle(`${PAGE_NAME} | Dira`)

  const applySort = (e) => {
    const value = e.target.value
    setSort(value)
    setFilters({ sortBy: value })
  }

  const applyFilter = (key, value) => {
    const newValue = filters?.[key] === value ? '' : value
    setFilters({ [key]: newValue })
  }

  const applyPrice = () => {
    setFilters({
      priceMin: priceRange.min,
      priceMax: priceRange.max,
    })
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className={cn('container pad-block-40', s.shop)}>
      <div className={s.sidebar}>
        <div>
          <Input
            type='select'
            name='sort'
            value={sort}
            options={SORT_OPTIONS}
            onChange={applySort}
          />
        </div>
        <div>
          <strong>Gender</strong>
          <ul className={s.optionList}>
            {GENDER_FILTER.map((opt) =>
              <OptionItem
                key={opt.label}
                label={opt.label}
                state={filters?.gender === opt.value}
                setState={() => applyFilter('gender', opt.value)}
              />
            )}
          </ul>
        </div>
        <div>
          <strong>Category</strong>
          <ul className={s.optionList}>
            {CATEGORY_FILTER.map((opt) =>
              <OptionItem
                key={opt.label}
                label={opt.label}
                state={filters?.category === opt.value}
                setState={() => applyFilter('category', opt.value)}
              />
            )}
          </ul>
        </div>
        <div>
          <strong>Price</strong>
          <div className='flex gap-10 a-center'>
            <Input
              type='number'
              name='min'
              value={priceRange.min}
              onChange={handlePriceChange}
              min={0}
              placeholder='Min'
              span
            />
            <span aria-hidden>—</span>
            <Input
              type='number'
              name='max'
              value={priceRange.max}
              onChange={handlePriceChange}
              min={priceRange.min || 0}
              placeholder='Max'
              span
            />
          </div>
          <Button
            text='Apply'
            span
            onClick={applyPrice}
          />
        </div>
        <div>
          <strong>Size</strong>
          <ul className={s.optionList}>
            {SIZE_FILTER.map((opt) =>
              <OptionItem
                key={opt.label}
                label={opt.label}
                state={filters?.size === opt.value}
                setState={() => applyFilter('size', opt.value)}
              />
            )}
          </ul>
        </div>
        <div>
          <strong>Color</strong>
          <ul className={s.optionList}>
            {COLOR_FILTER.map((opt) =>
              <OptionItem
                key={opt.label}
                label={opt.label}
                state={filters?.color === opt.value}
                setState={() => applyFilter('color', opt.value)}
              />
            )}
          </ul>
        </div>
      </div>
      <div className='flex-col gap-20'>
        <div>
          <ul className={s.productList}>
            {PRODUCTS.map((p) =>
              <li key={p.id}>
                <ProductCard product={p}/>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Shop