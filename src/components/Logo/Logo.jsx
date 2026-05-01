import cn from 'classnames'

import s from './Logo.module.scss'

function Logo({ size = 'm'}) {
  return (
    <span className={cn(s.logo, s[size])}>Dira</span>
  )
}

export default Logo