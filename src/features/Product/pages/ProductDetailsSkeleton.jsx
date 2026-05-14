import Skeleton from "react-loading-skeleton"
import cn from 'classnames'

import s from './ProductDetails.module.scss'
import SkeletonCard from "./SkeletonCard"

function ProductDetailsSkeleton() {
  return (
    <div className='container'>
      <section className='flex-col gap-20 pad-block-40'>
        <Skeleton width={220} height='1.5em' />
        <div className={s.product}>
          <div>
						<Skeleton borderRadius={0} style={{aspectRatio: 1}}/>
          </div>
          <div className={cn('flex-col gap-15', s.ProcutInfoCont)}>
            <div className={s.top}>
              <Skeleton width='70%' height='2.375em' />
              <Skeleton width={120} height='1.5em' />
            </div>
            <div className='flex-col gap-10'>
              <Skeleton count={2} height='1.5em' />
            </div>
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className='flex-col gap-5'>
								<Skeleton width={100} height='1.5em' />
								<div className='flex-wrap gap-5'>
									{Array.from({ length: 4 }).map((_, j) => (
										<Skeleton
											key={j}
											width={80}
											height='2em'
											borderRadius={3}
										/>
									))}
								</div>
							</div>
						))}
            <div className='flex-col gap-5'>
              <Skeleton width={120} height='1.5em' />
              <Skeleton
								width={90}
								height='1.75em'
                borderRadius={3}
              />
            </div>
            <Skeleton
              height='2.5em'
              borderRadius={6}
            />
          </div>
        </div>
      </section>
			<section className='flex-col gap-10 pad-block-40'>
        <Skeleton width={220} height='2.375em' />
				<ul className={s.reco}>
					<li>
						<SkeletonCard />
					</li>
					<li>
						<SkeletonCard />
					</li>
					<li>
						<SkeletonCard />
					</li>
					<li>
						<SkeletonCard />
					</li>
				</ul>
			</section>
    </div>
  )
}

export default ProductDetailsSkeleton