import { Link } from 'react-router-dom'
import './styles/Sidebar.css' // Importa el archivo de estilos CSS
import { IoIosNotifications } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { IoIosHome } from 'react-icons/io'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BsFilePerson } from 'react-icons/bs'
import { FaRegBuilding } from 'react-icons/fa'
import { FaFileContract } from 'react-icons/fa'
import { SiCashapp } from 'react-icons/si'
import { VscReport } from 'react-icons/vsc'
import { HiOutlineUsers } from 'react-icons/hi'
import { CiCircleInfo } from "react-icons/ci";
function Sidebar() {
  const [tipoUser, setTipoUser] = useState('')
  useEffect(() => {
    setTipoUser(localStorage.getItem('userType'))
  })
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="btn">
          <IoIosNotifications className="notificaciones" />
        </button>
        <h3>InmoPlata</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/Home" className="sidebar-link">
            <IoIosHome /> <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/Clients" className="sidebar-link">
            <IoPersonCircleOutline />
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link to="/Inquilinos" className="sidebar-link">
            <BsFilePerson />
            <span>Inquilinos</span>
          </Link>
        </li>
        <li>
          <Link to="/Immuebles" className="sidebar-link">
            <FaRegBuilding />
            <span>Inmuebles</span>
          </Link>
        </li>
        <li>
          <Link to="/Arredamientos" className="sidebar-link">
            <FaFileContract />
            <span>Arrendamientos</span>
          </Link>
        </li>
        <li>
          <Link to="/Pagos" className="sidebar-link">
            <SiCashapp />
            <span>Pagos</span>
          </Link>
        </li>
        <li>
          <Link to="/Formats" className="sidebar-link">
            <VscReport />
            <span>Formatos</span>
          </Link>
        </li>
        <li>
          <Link to="/Otros" className="sidebar-link">
            <CiCircleInfo />
            <span>Otros</span>
          </Link>
        </li>
        {tipoUser === 'admin' && (
          <li className="userLink">
            <Link to="/Users" className="sidebar-link userLink">
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
