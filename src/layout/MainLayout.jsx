import React from 'react'
import { useLocation, Outlet } from 'react-router'
import cn from 'classnames'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

import s from './MainLayout.module.scss'

function MainLayout() {
  const { pathname } = useLocation()

  const isHome = pathname === '/'

  return (
    <>
      <Navigation />
      <main className={cn('container-parent', s.main, {[s.isHome]: !isHome})}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout