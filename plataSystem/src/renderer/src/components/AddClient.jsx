import React, { useState } from 'react'
import Modal from 'react-modal'
import './styles/Addclient.css'
function AddClient() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [fechaNacimiento, setFechaNacimiento] = useState('')

  const handleChange = (event) => {
    const inputDate = event.target.value // Obtener el valor del input
    const fechaSinHora = inputDate.slice(0, 10) // Obtener solo la parte de la fecha (los primeros 10 caracteres)
    setFechaNacimiento(fechaSinHora) // Actualizar el estado con la fecha sin la hora
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
        <h2>Añadir cliente (dueño)</h2>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Ingrese su nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                placeholder="Ingrese su apellido"
                id=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="dni">Cedula </label>
              <input
                type="text"
                className="form-control"
                name="dni"
                placeholder="Ingrese su Cedula "
                id=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingrese su correo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Ingrese su telefóno"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Ingrese su dirección"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Fecha de Nacimiento</label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={handleChange}
                className="form-control"
                id="date"
                placeholder="Ingrese su fecha de nacimiento"
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Código Postal</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                placeholder="Ingrese su Código Postal"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notas</label>
              <textarea className="form-control" id="notes" rows="3"></textarea>
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
