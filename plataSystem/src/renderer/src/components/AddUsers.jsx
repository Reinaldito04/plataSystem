import { useState } from 'react'
import axiosInstance from '../utils/BackendConfig'

function AddUsers() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [typeUser, setTypeUser] = useState('')

  const handleSubmitRegister = (event) => {
    event.preventDefault() // Previene la recarga de la página
    if (username.length < 8) {
      alert('El usuario debe ser mayor a 8 caracteres')
    }

    if (password.length < 8) {
      alert('La contraseña debe ser mayor a 8 caracteres')
    }
    axiosInstance
      .post('/register', {
        username: username,
        password: password,
        tipo: typeUser
      })
      .then((response) => {
        console.log(response.data)
        alert('Usuario registrado correctamente')
      })
      .catch((error) => {
        alert(error.response.data)
      })

    setUsername('')
    setPassword('')
    setTypeUser('')
  }

  return (
    <>
      <p className="text-center">Registro de usuarios</p>
      <form onSubmit={handleSubmitRegister}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Ingrese su usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select
            className="form-control"
            id="type"
            onChange={(e) => setTypeUser(e.target.value)}
            value={typeUser}
          >
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </div>
        <div className="container mx-auto text-center">
          <button type="submit" className="btn mx-auto mt-2 btn-primary">
            Registrar
          </button>
        </div>
      </form>
    </>
  )
}

export default AddUsers
