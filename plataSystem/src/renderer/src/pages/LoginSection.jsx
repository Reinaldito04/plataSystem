import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/BackendConfig'

function LoginSection() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axiosInstance.post('/login', {
        username,
        password
      })

      const { username: user, type } = response.data
      localStorage.setItem('username', user)
      localStorage.setItem('userType', type)

      navigate('/Home') // Redirige a la página de destino
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card login-card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Ingreso de Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Cargando...' : 'Ingresar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginSection
