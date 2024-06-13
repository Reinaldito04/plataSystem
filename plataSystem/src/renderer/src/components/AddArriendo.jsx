import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import axiosInstance from '../utils/BackendConfig'
function AddArriendo() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedInmueble, setSelectedInmueble] = useState(null)

  const [formData, setFormData] = useState({
    InquilinoName: '',
    InquilinoLastName: '',
    InquilinoDNI: '',
    InquilinoRIF: '',
    InquilinoBirthday: '',
    Telefono: '',
    InquilinoMail: '',
    PriceMensual: '',
    InmuebleData: '2024 --- puerto la cruz',
    PorcentajeComision: '',
    FechaDeComision: ' ',
    FechaInicio: '',
    FechaFinalizacion: ''
  })
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleInmuebleSelect = (inmueble) => {
    setSelectedInmueble(inmueble)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axiosInstance.post('/addContract', formData)
      console.log('Cliente guardado exitosamente')
      setModalIsOpen(false)
    } catch (error) {
      console.error('Error al guardar el cliente:', error)
    }
  }
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="client">Nombre del Cliente (inquilino)</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoName"
                name="InquilinoName"
                onChange={handleChange}
                value={formData.InquilinoName}
                placeholder="Ingrese el nombre del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="client">Apellido del Cliente (inquilino)</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoLastName"
                name="InquilinoLastName"
                onChange={handleChange}
                value={formData.InquilinoLastName}
                placeholder="Ingrese el Apellido del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Cedula</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoDNI"
                name="InquilinoDNI"
                onChange={handleChange}
                value={formData.InquilinoDNI}
                placeholder="Ingrese la cedula del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Rif</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoRIF"
                name="InquilinoRIF"
                onChange={handleChange}
                value={formData.InquilinoRIF}
                placeholder="Ingrese el rif del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Correo</label>
              <input
                type="email"
                className="form-control"
                id="InquilinoMail"
                name="InquilinoMail"
                onChange={handleChange}
                value={formData.InquilinoMail}
                placeholder="Ingrese el Email del cliente"
              />
              <div className="form-group">
                <label htmlFor="cedula">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="Telefono"
                  name="Telefono"
                  onChange={handleChange}
                  value={formData.Telefono}
                  placeholder="Ingrese el telefono del cliente"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="InquilinoBirthday"
                name="InquilinoBirthday"
                onChange={handleChange}
                value={formData.InquilinoBirthday}
                placeholder="Ingrese su fecha de nacimiento"
              />
            </div>
            <div className="container">
              <InmuebleAutocomplete onSelect={handleInmuebleSelect} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio (mensual)</label>
              <input
                type="text"
                className="form-control"
                id="PriceMensual"
                name="PriceMensual"
                onChange={handleChange}
                value={formData.PriceMensual}
                placeholder="Ingrese el precio del inmueble"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Porcentaje de la comisión </label>
              <input
                type="text"
                className="form-control"
                id="PorcentajeComision"
                name="PorcentajeComision"
                onChange={handleChange}
                value={formData.PorcentajeComision}
                placeholder="Ingrese la comisión para la empresa"
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="comisionDate">Cuando cobrar la comisión</label>
              <input
                type="date"
                className="form-control"
                id="FechaDeComision"
                name="FechaDeComision"
                onChange={handleChange}
                value={formData.FechaDeComision}
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="property">Fecha de inicio</label>
              <input
                type="date"
                className="form-control"
                id="FechaInicio"
                name="FechaInicio"
                onChange={handleChange}
                value={formData.FechaInicio}
                placeholder="Ingrese la fecha de inicio "
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="end_date">Fecha de finalización</label>
              <input
                type="date"
                className="form-control"
                id="FechaFinalizacion"
                name="FechaFinalizacion"
                onChange={handleChange}
                value={formData.FechaFinalizacion}
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
          </form>
        </div>
      </Modal>
    </>
  )
}

export default AddArriendo
