import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import MainLayout from '@/layout/MainLayout'
import Home from '@/pages/Home/Home'
import Shop from '@/pages/Shop/Shop'
import Faq from '@/pages/Faq/Faq'
import ContactUs from '@/pages/ContactUs/ContactUs'
import Cart from '@/pages/Cart/Cart'
import Profile from '@/pages/Profile/Profile'
import Orders from '@/pages/Orders/Orders'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='*' element={<Navigate to='/' replace />}/>
        <Route index element={<Home />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/faq' element={<Faq />}/>
        <Route path='/contact-us' element={<ContactUs />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/orders' element={<Orders />}/>
      </Route>
    </Routes>
  )
}

export default App