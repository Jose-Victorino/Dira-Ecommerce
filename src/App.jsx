import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import '@/styles/index.scss'

import LandingApp from './LandingApp'
import DashboardApp from './DashboardApp'

const AuthLayout = lazy(() => import('@/pages/Auth/AuthLayout'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'))
const Recover = lazy(() => import('@/pages/Auth/Recover'))
const SignUp = lazy(() => import('@/pages/Auth/SignUp'))

function App() {

  return (
    <Routes>
      <Route path='*' element={<LandingApp />}/>
      <Route path='/dashboard/*' element={<DashboardApp />} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Navigate to='/auth/login' replace />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
        <Route path='login' element={<Login />}/>
        <Route path='sign-up' element={<SignUp />}/>
        <Route path='forgot-password' element={<ForgotPassword />}/>
        <Route path='recover' element={<Recover />}/>
      </Route>
    </Routes>
  )
}

export default App