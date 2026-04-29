import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import MainLayout from '@/layout/MainLayout'

import '@/styles/index.scss'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />}/>
      </Route>
    </Routes>
  )
}

export default App