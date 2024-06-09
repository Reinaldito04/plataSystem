import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
function AddArriendo() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <div className="text-center mt-2">
        <button
          onClick={() => {
            setModalIsOpen(true)
          }}
          className="btn btn-primary"
        >
          Agregar Arriendo
        </button>
      </div>

      <Modal
        className="custom-modal modalArriendo"
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
        <div className="modal-content">
          <h2>Añadir Arriendo</h2>
          <div className="form-group">
            <label htmlFor="client">Cliente (inquilino)</label>
            <input
              type="text"
              className="form-control"
              id="client"
              placeholder="Ingrese el nombre del cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Cedula</label>
            <input
              type="text"
              className="form-control"
              id="cedula"
              placeholder="Ingrese la cedula del cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Rif</label>
            <input
              type="text"
              className="form-control"
              id="rif"
              placeholder="Ingrese el rif del cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Correo</label>
            <input
              type="email"
              className="form-control"
              id="mail"
              placeholder="Ingrese el Email del cliente"
            />
            <div className="form-group">
              <label htmlFor="cedula">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Ingrese el telefono del cliente"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="property">Inmueble</label>
            <input
              type="text"
              className="form-control"
              id="property"
              placeholder="Ingrese el nombre del inmueble"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio (mensual)</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Ingrese el precio del inmueble"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Porcentaje de la comisión </label>
            <input
              type="text"
              className="form-control"
              id="comisión"
              placeholder="Ingrese la comisión para la empresa"
            />
          </div>
          <div className="container-fluid">
            <label htmlFor="comisionDate">Cuando cobrar la comisión</label>
            <input type="date" className="form-control" id="comisionDate" />
          </div>
          <div className="container-fluid">
            <label htmlFor="property">Fecha de inicio</label>
            <input
              type="date"
              className="form-control"
              id="property"
              placeholder="Ingrese la fecha de inicio "
            />
          </div>
          <div className="container-fluid">
            <label htmlFor="end_date">Fecha de finalización</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              placeholder="Ingrese la fecha de finalización"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notas</label>
            <textarea
              className="form-control"
              id="notes"
              rows="3"
              placeholder="Ingrese las observaciones"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </Modal>
    </>
  )
}

export default AddArriendo
