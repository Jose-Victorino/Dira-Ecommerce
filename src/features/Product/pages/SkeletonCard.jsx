import Skeleton from 'react-loading-skeleton'

function SkeletonCard() {

  return (
    <div className='flex-col gap-10'>
      <Skeleton width='100%' style={{aspectRatio: 1}}/>
      <div>
        <Skeleton width='70%' />
        <Skeleton width='30%' />
      </div>
    </div>
  )
}

export default SkeletonCard