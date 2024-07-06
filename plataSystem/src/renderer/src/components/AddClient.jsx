import { useState } from 'react'
import Modal from 'react-modal'
import './styles/Addclient.css'
import axiosInstance from '../utils/BackendConfig'
import { useEffect } from 'react'
function AddClient() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    rif: '',
    address: '',
    birthdate: '',
    CodePostal: '',
    notes: ''
  })
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axiosInstance.post('/addClient', formData)
      console.log('Cliente guardado exitosamente')
      const description = `Se añadio al cliente de la cedula del identidad : ${formData.dni}`
      await axiosInstance.post('/addInformation', {
        username: username,
        description: description
      })
      setModalIsOpen(false)
    } catch (error) {
      console.error('Error al guardar el cliente:', error)
    }
  }

  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            setModalIsOpen(true)
          }}
          className="btn btn-primary mt-2 mx-auto"
        >
          Añadir Cliente
        </button>
      </div>

      <Modal
        className="custom-modal"
        overlayClassName="custom-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Ejemplo de Modal"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setModalIsOpen(false)}>
            X
          </button>
        </div>
        <h2>Añadir cliente (Propietario)</h2>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Ingrese su nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Ingrese su apellido"
                value={formData.lastName}
                onChange={handleChange}
                id="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dni">Cedula </label>
              <input
                type="text"
                className="form-control"
                name="dni"
                placeholder="Ingrese su Cedula "
                value={formData.dni}
                onChange={handleChange}
                id="dni"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dni">Rif </label>
              <input
                type="text"
                className="form-control"
                name="rif"
                placeholder="Ingrese su Rif "
                value={formData.rif}
                onChange={handleChange}
                id="rif"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingrese su telefóno"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ingrese su dirección"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Fecha de Nacimiento</label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(event) => {
                  handleChange(event)
                }}
                className="form-control"
                id="date"
                name="birthdate"
                placeholder="Ingrese su fecha de nacimiento"
              />
            </div>

            <div className="form-group">
              <label htmlFor="CodePostal">Código Postal</label>
              <input
                type="text"
                className="form-control"
                id="CodePostal"
                value={formData.postalCode}
                onChange={handleChange}
                name="CodePostal"
                placeholder="Ingrese su Código Postal"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default AddClient
