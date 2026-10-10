import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './features/home/pages/Home'
import Login from './features/auth/pages/Login'
import DashboardLayout from './shared/layouts/DashboardLayout'
import Services from './features/services/pages/Services'
import Projects from './features/projects/pages/Projects'
import ProtectedRoute from './app/ProtectedRoute'

const App = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App