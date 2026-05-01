import React from 'react'
import { Outlet } from 'react-router'

import s from './AuthLayout.module.scss'

function AuthLayout() {
  
  return (
    <section className={s.authWrapper}>
      <div className={s.bg}></div>
      <div className={s.auth}>
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout