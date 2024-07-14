import { Routes, Route } from 'react-router-dom'
import LoginSection from '../pages/LoginSection'
import Clients from '../pages/Clients'
import Immuebles from '../pages/Immuebles'
import Home from '../pages/Home'
import Arredamientos from '../pages/Arredamientos'
import Inquilinos from '../pages/Inquilinos'
import Formats from '../pages/Formats'
import Pagos from '../pages/Pagos'
import Users from '../pages/Users'
import Otros from '../pages/Otros'
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginSection />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Clients" element={<Clients />} />
      <Route path="/Inmuebles" element={<Immuebles />} />
      <Route path="/Arredamientos" element={<Arredamientos />} />
      <Route path="/Pagos" element={<Pagos />} />
      <Route path="/Inquilinos" element={<Inquilinos />} />
      <Route path="/Formats" element={<Formats />} />
      <Route path="/Otros" element={<Otros />} />
      <Route path="/Users" element={<Users />} />
    </Routes>
  )
}

export default Routers
