import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import './styles/Layout.css'
function Layout({ children }) {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired // Validación de PropTypes para children
}

export default Layout
