import { useState, useMemo } from 'react'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import OptionItem from '@/components/OptionItem/OptionItem'
import QuantityInput from '@/components/QuantityInput/QuantityInput'
import ImageSlider from '../components/ImageSlider'
import ProductCard from './ProductCard'

import { formatToCurrency } from '@/library/Util'

import s from './ProductDetails.module.scss'

const RAW_PRODUCT = [
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 1,
		"image_path" : "/images/air-max-black.jpg",
		"variant_id" : 1,
		"sku" : "NA-BLK-9",
		"price" : 19.99,
		"stock" : 10,
		"variant_active" : 1,
		"attribute_name" : "Color",
		"attribute_value" : "Black"
	},
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 1,
		"image_path" : "/images/air-max-black.jpg",
		"variant_id" : 1,
		"sku" : "NA-BLK-9",
		"price" : 19.99,
		"stock" : 10,
		"variant_active" : 1,
		"attribute_name" : "Size",
		"attribute_value" : "US 9"
	},
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 1,
		"image_path" : "/images/air-max-black.jpg",
		"variant_id" : 2,
		"sku" : "NA-BLK-10",
		"price" : 19.99,
		"stock" : 15,
		"variant_active" : 1,
		"attribute_name" : "Color",
		"attribute_value" : "Black"
	},
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 1,
		"image_path" : "/images/air-max-black.jpg",
		"variant_id" : 2,
		"sku" : "NA-BLK-10",
		"price" : 19.99,
		"stock" : 15,
		"variant_active" : 1,
		"attribute_name" : "Size",
		"attribute_value" : "US 10"
	},
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 2,
		"image_path" : "/images/air-max-white.jpg",
		"variant_id" : 3,
		"sku" : "NA-WHT-10",
		"price" : 19.99,
		"stock" : 8,
		"variant_active" : 1,
		"attribute_name" : "Color",
		"attribute_value" : "White"
	},
	{
		"product_id" : 1,
		"product_name" : "Nike Air Max",
		"product_slug" : "nike-air-max",
		"description" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
		"product_active" : 1,
		"created_at" : "2026-05-04 08:51:44",
		"category_id" : 1,
		"category_name" : "Lifestyle",
		"category_slug" : "lifestyle",
		"image_id" : 2,
		"image_path" : "/images/air-max-white.jpg",
		"variant_id" : 3,
		"sku" : "NA-WHT-10",
		"price" : 19.99,
		"stock" : 8,
		"variant_active" : 1,
		"attribute_name" : "Size",
		"attribute_value" : "US 10"
	}
]

function groupProduct(rows) {
  const product = {
    id: rows[0].product_id,
    name: rows[0].product_name,
    slug: rows[0].product_slug,
    description: rows[0].description,
    created_at: rows[0].created_at,
    category: {
      id: rows[0].category_id,
      name: rows[0].category_name,
      slug: rows[0].category_slug,
    },
    images: [],
    attributes: [],
    variants: [],
  }

  const imageMap = new Map()
  const variantMap = new Map()
  const attributeMap = new Map()

  for(const row of rows){
    // IMAGES
    if(!imageMap.has(row.image_id)){
      const image = {
        id: row.image_id,
        path: row.image_path,
        variant_ids: new Set(),
      }
      imageMap.set(row.image_id, image)
      product.images.push(image)
    }

    imageMap.get(row.image_id).variant_ids.add(row.variant_id)

    // VARIANTS
    if(!variantMap.has(row.variant_id)){
      const variant = {
        id: row.variant_id,
        sku: row.sku,
        price: row.price,
        stock: row.stock,
        attributes: {},
      }

      variantMap.set(row.variant_id, variant)
      product.variants.push(variant)
    }

    // ATTRIBUTES
    const variant = variantMap.get(row.variant_id)
    variant.attributes[row.attribute_name] = row.attribute_value

    // GLOBAL ATTRIBUTES
    if(!attributeMap.has(row.attribute_name)){
      attributeMap.set(row.attribute_name, new Set())
    }

    attributeMap.get(row.attribute_name).add(row.attribute_value)
  }

  for(const image of product.images){
    image.variant_ids = Array.from(image.variant_ids)
  }

	product.attributes = Array.from(attributeMap.entries())
		.map(([name, values]) => ({
			name,
			values: Array.from(values)
		}))

  return product
}
const PRODUCTS = [
  {id: 1, name: 'Nike Air Max dimsum1', slug: 'air_-_max', price: 1000},
  {id: 2, name: 'Nike Air Max dimsum2', slug: 'air_-_max', price: 1000},
  {id: 3, name: 'Nike Air Max dimsum3', slug: 'air_-_max', price: 1000},
  {id: 4, name: 'Nike Air Max dimsum4', slug: 'air_-_max', price: 1000},
]
const productData = {
	"id": 1,
	"name": "Nike Air Max",
	"slug": "nike-air-max",
	"description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore nam, minus sunt voluptatibus itaque voluptatem",
	"created_at": "2026-05-04 08:51:44",
	"category": {
		"id": 1,
		"name": "Lifestyle",
		"slug": "lifestyle"
	},
	"images": [
		{
			"id": 1,
			"path": "/images/air-max-black.jpg",
			"variant_ids": [1, 2]
		},
		{
			"id": 2,
			"path": "/images/air-max-white.jpg",
			"variant_ids": [3]
		}
	],
	"attributes": [
		{
			"name": "Color",
			"values": ["Black", "White"]
		},
		{
			"name": "Size",
			"values": ["US 9", "US 10"]
		}
	],
	"variants": [
		{
			"id": 1,
			"sku": "NA-BLK-9",
			"price": 19.99,
			"stock": 10,
			"attributes": {
				"Color": "Black",
				"Size": "US 9"
			}
		},
		{
			"id": 2,
			"sku": "NA-BLK-10",
			"price": 19.99,
			"stock": 15,
			"attributes": {
				"Color": "Black",
				"Size": "US 10"
			}
		},
		{
			"id": 3,
			"sku": "NA-WHT-10",
			"price": 19.99,
			"stock": 30,
			"attributes": {
				"Color": "White",
				"Size": "US 10"
			}
		}
	]
}

function ProductDetails() {
	const [selectedAttr, setSelectedAttr] = useState({})
	const [quantity, setQuantity] = useState(1)
	const [error, setError] = useState('')

	const stockedVariants = productData.variants.filter(({stock}) => stock > 0)

	const filteredVariants = stockedVariants.filter(({ attributes }) => {
		return Object.entries(selectedAttr).every(([key, val]) => {
			return attributes[key] === val
		})
	})

	const isNoStock = stockedVariants.length <= 0
	const isSelectionComplete = productData.attributes.every(attr => selectedAttr[attr.name])
	const isOneVariant = filteredVariants.length === 1
	const activeVariantIds = useMemo(() => (
		isSelectionComplete ? filteredVariants.map(v => v.id) : []
	), [isSelectionComplete, filteredVariants])
	
  const formattedPrice = useMemo(() => {
		if(filteredVariants.length === 0) return null

    if(isOneVariant) return formatToCurrency(filteredVariants[0].price)

    const prices = filteredVariants.map(v => v.price)
    const minPrice = formatToCurrency(Math.min(...prices))
    const maxPrice = formatToCurrency(Math.max(...prices))

    return minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`
  }, [filteredVariants])

	const isOptionDisabled = (attrName, value) => {
		return !stockedVariants.some(({ attributes, stock }) => {
			if(stock <= 0) return false

			const matchesSelected = Object.entries(selectedAttr).every(([key, val]) => {
				if(key === attrName) return true
				return attributes[key] === val
			})

			const matchesCurrent = attributes[attrName] === value

			return matchesSelected && matchesCurrent
		})
	}

	const handleAttrState = (name, value) => {
		setSelectedAttr(prev => {
			if(prev?.[name] === value){
				const { [name]: _, ...rest } = prev
				return rest
			}
			return {...prev, [name]: value}
		})
	}

	const handleAddToCart = () => {
		if(isNoStock) return

		if(quantity < 1){
			setError('Quantity must be at least 1')
			return
		}

		if(!isSelectionComplete){	
			setError('Please select a variant')
			return
		}

		setError('')
		console.log(filteredVariants[0], quantity)
	}

  return (
    <div className='container'>
      <section className='flex-col gap-20 pad-block-40'>
				<Breadcrumbs
					crumbs={[
						{label: 'Shop', path: '/shop'},
						{label: productData.category.name, path: `/shop?category=${productData.category.slug}`},
						{label: productData.name, path: `/products/${productData.slug}`},
					]}
				/>
				<div className={s.product}>
					<div>
						<ImageSlider
							id='product-images'
							cards={productData.images}
							productName={productData.name}
							activeVariantIds={activeVariantIds} 
						/>
					</div>
					<div className={cn('flex-col gap-15', s.ProcutInfoCont)}>
						<div className={s.top}>
							<h4>{productData.name}</h4>
							{formattedPrice && <strong>{formattedPrice}</strong>}
						</div>
						<p>{productData.description}</p>
						{productData.attributes.map(({name, values}) =>
							<div key={name} className='flex-col gap-5'>
								<strong>{name}</strong>
								<ul className='flex-wrap gap-10'>
									{values.map((v) =>
										<OptionItem
											key={v}
											label={v}
											state={selectedAttr?.[name] === v}
											disabled={isOptionDisabled(name, v)}
											setState={() => handleAttrState(name, v)}
										/>
									)}
								</ul>
							</div>
						)}
						<div className='flex-col gap-5'>
							<strong>Quantity</strong>
							<QuantityInput
								id={productData.id}
								state={quantity}
								min={1}
								setState={(next) => { setQuantity(next) }}
							/>
						</div>
						<div className='flex-col gap-5'>
							{error && <p className={s.error}>{error}</p>}
							<Button
								text={isNoStock ? 'Out of Stock' : 'Add to Cart'}
								span
								disabled={isNoStock}
								onClick={() => handleAddToCart()}
							/>
						</div>
					</div>
				</div>
      </section>
			<section className='flex-col gap-10 pad-block-40'>
				<h4>You may also like</h4>
				<ul className={s.reco}>
					{PRODUCTS.map((p) =>
						<li key={p.id}>
							<ProductCard product={p}/>
						</li>
					)}
				</ul>
			</section>
    </div>
  )
}

export default ProductDetails