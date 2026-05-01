import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Login.module.scss'

const PAGE_NAME = 'Login'

function Login() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)
  
  return (
    <div>
      Login
    </div>
  )
}

export default Login