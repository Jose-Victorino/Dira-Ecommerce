import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Recover.module.scss'

const PAGE_NAME = 'Recover Password'

function Recover() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>
      Recover
    </div>
  )
}

export default Recover