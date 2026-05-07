import { useState } from 'react'
import useQueryParams from '@/hooks/useQueryParams'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { productService } from '@/service/crudService.tanstack'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import ProductCard from '@/features/Product/pages/ProductCard'
import OptionItem from '@/components/OptionItem/OptionItem'
import Input from '@/components/Input/Input'

import s from './Shop.module.scss'
import * as Yup from 'yup'

const PAGE_NAME = 'Shop'

const SORT_OPTIONS = {
  latest: 'Latest',
  price_asc: 'Price (Low to High)',
  price_desc: 'Price (High to Low)',
  name_asc: 'Alphabetical (A-Z)',
  name_desc: 'Alphabetical (Z-A)',
}
const CATEGORY_FILTER = [
  {label: 'Lifestyle',  value: 'lifestyle'},
  {label: 'Sports',     value: 'sports'},
  {label: 'Running',    value: 'running'},
  {label: 'Slides',     value: 'slides'},
  {label: 'Laces',      value: 'laces'},
  {label: 'Shoe Care',  value: 'shoe care'},
]
const SIZE_FILTER = [
  {label: 'US 4',     value: 'US 4'},
  {label: 'US 4.5',   value: 'US 4.5'},
  {label: 'US 5',     value: 'US 5'},
  {label: 'US 5.5',   value: 'US 5.5'},
  {label: 'US 6',     value: 'US 6'},
  {label: 'US 6.5',   value: 'US 6.5'},
  {label: 'US 7',     value: 'US 7'},
  {label: 'US 7.5',   value: 'US 7.5'},
  {label: 'US 8',     value: 'US 8'},
  {label: 'US 8.5',   value: 'US 8.5'},
  {label: 'US 9',     value: 'US 9'},
  {label: 'US 9.5',   value: 'US 9.5'},
  {label: 'US 10',    value: 'US 10'},
  {label: 'US 10.5',  value: 'US 10.5'},
  {label: 'US 11',    value: 'US 11'},
  {label: 'US 11.5',  value: 'US 11.5'},
  {label: 'US 12',    value: 'US 12'},
]
const COLOR_FILTER = [
  {label: 'Beige',    value: 'Beige'},
  {label: 'Black',    value: 'Black'},
  {label: 'Blue',     value: 'Blue'},
  {label: 'Brown',    value: 'Brown'},
  {label: 'Gray',     value: 'Gray'},
  {label: 'Green',    value: 'Green'},
  {label: 'Orange',   value: 'Orange'},
  {label: 'Pink',     value: 'Pink'},
  {label: 'Purple',   value: 'Purple'},
  {label: 'Red',      value: 'Red'},
  {label: 'White',    value: 'White'},
  {label: 'Yellow',   value: 'Yellow'},
]

const SORT = ['latest', 'price_asc', 'price_desc', 'name_asc', 'name_desc']
const CATEGORY = ['lifestyle', 'sports', 'running', 'slides', 'laces', 'shoe care']
const SIZE = ['US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12']
const COLOR = ['Beige', 'Black', 'Blue', 'Brown', 'Gray', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow']

function Shop() {
  const [filters, setFilters] = useQueryParams({
    shape: {
      sortBy: Yup.string().oneOf(SORT).optional(),
      category: Yup.string().oneOf(CATEGORY).optional(),
      priceMin: Yup.number().min(0).optional(),
      priceMax: Yup.number().min(0).optional(),
      variant: Yup.object({
        size: Yup.string().oneOf(SIZE).optional(),
        color: Yup.string().oneOf(COLOR).optional(),
      }).optional(),
    }
  })
  const [priceRange, setPriceRange] = useState({ min: filters.priceMin ?? '', max: filters.priceMax ?? '' })
  const [sort, setSort] = useState(filters.sortBy ?? 'latest')

  useDocumentTitle(`${PAGE_NAME} | Dira`)

  const resProduct = productService.getList(filters)

  const applySort = (e) => {
    const value = e.target.value
    setSort(value)
    setFilters({ sortBy: value })
  }

  const applyFilter = (key, value) => {
  if(key === 'size' || key === 'color') {
    const currentVariant = filters?.variant ?? {}
    const isSame = currentVariant[key] === value
    const newVariant = { ...currentVariant, [key]: isSame ? undefined : value }

    if(isSame) delete newVariant[key]

    const isEmpty = Object.keys(newVariant).length === 0
    setFilters({ variant: isEmpty ? null : newVariant })
  } else{
    const newValue = filters?.[key] === value ? '' : value
    setFilters({ [key]: newValue })
  }
}

  const applyPrice = () => {
    setFilters({
      priceMin: Number(priceRange.min),
      priceMax: Number(priceRange.max),
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
                state={filters?.variant?.size === opt.value}
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
                state={filters?.variant?.color === opt.value}
                setState={() => applyFilter('color', opt.value)}
              />
            )}
          </ul>
        </div>
      </div>
      <div className='flex-col gap-20'>
        {resProduct.isLoading ? <>Loading...</> :
          <ul className={s.productList}>
            {resProduct.data?.map((p) =>
              <li key={p.id}>
                <ProductCard product={p}/>
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  )
}

export default Shop