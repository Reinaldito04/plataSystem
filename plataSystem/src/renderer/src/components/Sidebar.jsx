import { Link, useLocation } from 'react-router-dom' // Importar useLocation
import './styles/Sidebar.css' // Importa el archivo de estilos CSS
import { useEffect, useState } from 'react'
import { IoIosHome } from 'react-icons/io'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BsFilePerson } from 'react-icons/bs'
import { FaRegBuilding } from 'react-icons/fa'
import { FaFileContract } from 'react-icons/fa'
import { SiCashapp } from 'react-icons/si'
import { VscReport } from 'react-icons/vsc'
import { HiOutlineUsers } from 'react-icons/hi'
import { CiCircleInfo } from 'react-icons/ci'
import logo from '../assets/Images/logo.png'

function Sidebar() {
  const [tipoUser, setTipoUser] = useState('')
  const location = useLocation() // Obtener la ubicación actual

  useEffect(() => {
    setTipoUser(localStorage.getItem('userType'))
  }, [])

  // Función para comprobar si la ruta actual coincide con el enlace
  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : ''
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} width={120} height={120} alt="logo" />
        <h3>InmoPlata</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/Home" className={`sidebar-link ${isActive('/Home')}`}>
            <IoIosHome /> <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/Clients" className={`sidebar-link ${isActive('/Clients')}`}>
            <IoPersonCircleOutline />
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link to="/Inquilinos" className={`sidebar-link ${isActive('/Inquilinos')}`}>
            <BsFilePerson />
            <span>Inquilinos</span>
          </Link>
        </li>
        <li>
          <Link to="/Inmuebles" className={`sidebar-link ${isActive('/Inmuebles')}`}>
            <FaRegBuilding />
            <span>Inmuebles</span>
          </Link>
        </li>
        <li>
          <Link to="/Arredamientos" className={`sidebar-link ${isActive('/Arredamientos')}`}>
            <FaFileContract />
            <span>Arrendamientos</span>
          </Link>
        </li>
        <li>
          <Link to="/Pagos" className={`sidebar-link ${isActive('/Pagos')}`}>
            <SiCashapp />
            <span>Pagos</span>
          </Link>
        </li>
        <li>
          <Link to="/Formats" className={`sidebar-link ${isActive('/Formats')}`}>
            <VscReport />
            <span>Formatos</span>
          </Link>
        </li>
        <li>
          <Link to="/Otros" className={`sidebar-link ${isActive('/Otros')}`}>
            <CiCircleInfo />
            <span>Otros</span>
          </Link>
        </li>
        {tipoUser === 'admin' && (
          <li className="userLink">
            <Link to="/Users" className={`sidebar-link userLink ${isActive('/Users')}`}>
              <HiOutlineUsers />
              <span>Usuarios</span>
            </Link>
          </li>
        )}
      </ul>
      <div className="footerSidebar">
        <a target="_blank" rel="noreferrer" href="https://portfolio-reinaldobellorin.netlify.app/">
          <p className="myName"> Soporte</p>
        </a>
      </div>
    </div>
  )
}

export default Sidebar
