import React from 'react'
import { Outlet } from 'react-router'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

import s from './MainLayout.module.scss'

function MainLayout() {
  return (
    <>
      <Navigation />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout