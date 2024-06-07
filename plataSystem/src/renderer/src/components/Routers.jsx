import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginSection from '../pages/LoginSection'
import Clients from '../pages/Clients'
import Immuebles from '../pages/Immuebles'
import Home from '../pages/Home'
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginSection />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Clients" element={<Clients />} />
      <Route path="/Immuebles" element={<Immuebles />} />
    </Routes>
  )
}

export default Routers
