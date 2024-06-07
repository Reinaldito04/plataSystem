import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Sidebar.css' // Importa el archivo de estilos CSS

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Plata System</h3>
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
          <Link to="/Immuebles" className="sidebar-link">
            <i className="fas fa-users"></i>
            <span>Immuebles</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
