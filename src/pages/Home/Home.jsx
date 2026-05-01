import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Home.module.scss'

function Home() {
  useDocumentTitle(`Dira`)

  return (
    <div>Home</div>
  )
}

export default Home