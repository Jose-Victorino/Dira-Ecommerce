import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { ToastContainer } from '@/components/Toast'
import MainLayout from '@/layout/MainLayout'
import Home from '@/pages/Home/Home'
import Shop from '@/pages/Shop/Shop'
import Faq from '@/pages/Faq/Faq'
import ContactUs from '@/pages/ContactUs/ContactUs'
import Cart from '@/features/Cart/pages/Cart'
import Profile from '@/pages/Profile/Profile'
import Orders from '@/pages/Orders/Orders'
import ProductDetails from '@/features/Product/pages/ProductDetails'
import Privacy from '@/pages/Policy/Privacy'
import Shipping from '@/pages/Policy/Shipping'
import Refund from '@/pages/Policy/Refund'
import TermsOfService from '@/pages/Policy/TermsOfService'

function App() {

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='light'
      />
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
          <Route path='/products/:product_slug' element={<ProductDetails />} />
          <Route path='/policy/privacy' element={<Privacy />}/>
          <Route path='/policy/shipping' element={<Shipping />}/>
          <Route path='/policy/refund' element={<Refund />}/>
          <Route path='/policy/terms-of-service' element={<TermsOfService />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App