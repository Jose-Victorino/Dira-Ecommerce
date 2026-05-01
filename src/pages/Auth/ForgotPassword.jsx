import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './ForgotPassword.module.scss'

const PAGE_NAME = 'Forgot Password'

function ForgotPassword() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>
      ForgotPassword
    </div>
  )
}

export default ForgotPassword