import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function LoginSection() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes agregar la lógica de autenticación si es necesario
    navigate('/Home') // Redirige a la página de destino (ejemplo: "/dashboard")
  }
  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card login-card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Ingreso de Sesión</h3>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Ingrese su usuario"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="d-grid">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginSection
