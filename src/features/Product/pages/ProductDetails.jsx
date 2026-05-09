import { useState } from 'react'
import { useParams } from 'react-router'
import { useCart } from '@/features/Cart/hooks/useCart'
import { productService } from '@/service/crudService.tanstack'
import cn from 'classnames'

import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import OptionItem from '@/components/OptionItem/OptionItem'
import QuantityInput from '@/components/QuantityInput/QuantityInput'
import ImageSlider from '../components/ImageSlider'
import ProductCard from './ProductCard'

import { formatToCurrency } from '@/library/Util'

import s from './ProductDetails.module.scss'
import { toast } from '@/components/Toast'

// TODO work on the "You may also like"
function ProductDetails() {
	const { product_slug } = useParams()
	const [selectedAttr, setSelectedAttr] = useState({})
	const [quantity, setQuantity] = useState(1)
	const [error, setError] = useState('')
	const cart = useCart()

	const resProduct = productService.getById(product_slug)

	if(resProduct.isLoading) return <div className='container'>Loading...</div>
	if(resProduct.isError) return <div className='container'>Something went wrong.</div>

	const stockedVariants = resProduct.data.variants.filter(({stock}) => stock > 0)

	const filteredVariants = stockedVariants.filter(({ attribute }) => {
		return Object.entries(selectedAttr).every(([key, val]) => {
			return attribute[key] === val
		})
	})

	const isNoStock = stockedVariants.length <= 0
	const isSelectionComplete = resProduct.data.attributes.every(attr => selectedAttr[attr.name])
	const isOneVariant = filteredVariants.length === 1
	const activeVariantIds = isSelectionComplete ? filteredVariants.map(v => v.id) : []

  const formattedPrice = () => {
		if(filteredVariants.length === 0) return null

    if(isOneVariant) return formatToCurrency(filteredVariants[0].price)

    const prices = filteredVariants.map(v => v.price)
    const minPrice = formatToCurrency(Math.min(...prices))
    const maxPrice = formatToCurrency(Math.max(...prices))

    return minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`
  }

	const isOptionDisabled = (attrName, value) => {
		return !stockedVariants.some(({ attribute, stock }) => {
			if(stock <= 0) return false

			const matchesSelected = Object.entries(selectedAttr).every(([key, val]) => {
				if(key === attrName) return true
				return attribute[key] === val
			})

			const matchesCurrent = attribute[attrName] === value

			return matchesSelected && matchesCurrent
		})
	}

	const handleAttrState = (name, value) => {
		setSelectedAttr(prev => {
			if(prev?.[name] === value){
				// @ts-ignore
				const { [name]: _, ...rest } = prev
				return rest
			}
			return {...prev, [name]: value}
		})
	}

	const handleAddToCart = () => {
		if(isNoStock || cart.addStatus.isPending) return

		if(quantity < 1){
			setError('Quantity must be at least 1')
			return
		}

		if(!isSelectionComplete){	
			setError('Please select a variant')
			return
		}

		setError('')
		cart.add(filteredVariants[0].id, quantity, {
			onSuccess: () => toast.success({
				title: 'Item Added',
				message: `${resProduct.data.name} has been added`,
				duration: 3000,
			}),
			onError: () => toast.error('Something went wrong'),
		})
	}

  return (
    <div className='container'>
      <section className='flex-col gap-20 pad-block-40'>
				<Breadcrumbs
					crumbs={[
						{label: 'Shop', path: '/shop'},
						{label: resProduct.data.category.name, path: `/shop?category=${resProduct.data.category.slug}`},
						{label: resProduct.data.name, path: `/products/${resProduct.data.slug}`},
					]}
				/>
				<div className={s.product}>
					<div>
						<ImageSlider
							id='product-images'
							cards={resProduct.data.images}
							productName={resProduct.data.name}
							activeVariantIds={activeVariantIds} 
						/>
					</div>
					<div className={cn('flex-col gap-15', s.ProcutInfoCont)}>
						<div className={s.top}>
							<h4>{resProduct.data.name}</h4>
							{formattedPrice() && <strong>{formattedPrice()}</strong>}
						</div>
						<p>{resProduct.data.description}</p>
						{resProduct.data.attributes.map(({name, values}) =>
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
								id={resProduct.data.id}
								state={quantity}
								min={1}
								setState={setQuantity}
							/>
						</div>
						<div className='flex-col gap-5'>
							{error && <p className={s.error}>{error}</p>}
							<Button
								text={isNoStock ? 'Out of Stock' : 'Add to Cart'}
								span
            		icon={cart.addStatus.isPending && <Loader.Circular height='1.25em' />}
								disabled={isNoStock || cart.addStatus.isPending}
								onClick={() => handleAddToCart()}
							/>
						</div>
					</div>
				</div>
      </section>
			<section className='flex-col gap-10 pad-block-40'>
				<h4>You may also like</h4>
				<ul className={s.reco}>
					
				</ul>
			</section>
    </div>
  )
}

export default ProductDetails