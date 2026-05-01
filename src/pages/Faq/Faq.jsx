import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Faq.module.scss'

const PAGE_NAME = 'FAQ'

function Faq() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <section>
      Faq
    </section>
  )
}

export default Faq