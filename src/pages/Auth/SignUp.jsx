import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './SignUp.module.scss'

const PAGE_NAME = 'Sign up'

function SignUp() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)
  
  return (
    <div>
      SignUp
    </div>
  )
}

export default SignUp