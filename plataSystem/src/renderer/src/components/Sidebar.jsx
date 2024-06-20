import { Link } from 'react-router-dom'
import './styles/Sidebar.css' // Importa el archivo de estilos CSS
import { IoIosNotifications } from 'react-icons/io'
import { useEffect, useState } from 'react'
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
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/Clients" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link to="/Inquilinos" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Inquilinos</span>
          </Link>
        </li>
        <li>
          <Link to="/Immuebles" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Inmuebles</span>
          </Link>
        </li>
        <li>
          <Link to="/Arredamientos" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Arrendamientos</span>
          </Link>
        </li>
        <li>
          <Link to="/Pagos" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Pagos</span>
          </Link>
        </li>
        <li>
          <Link to="/Formats" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Formatos</span>
          </Link>
        </li>
        {tipoUser === 'admin' && (
          <li className="userLink">
            <Link to="/Users" className="sidebar-link userLink">
              <i className="fas fa-users"></i>
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
