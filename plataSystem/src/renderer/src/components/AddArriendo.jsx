import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import axiosInstance from '../utils/BackendConfig'

function AddArriendo() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedInmueble, setSelectedInmueble] = useState(null)
  const [inquilinoName, setInquilinoName] = useState('')
  const [InquilinoLastName, setInquilinoLastName] = useState('')
  const [InquilinoDNI, setInquilinoDNI] = useState('')
  const [InquilinoRIF, setInquilinoRIF] = useState('')
  const [InquilinoBirthday, setInquilinoBirthday] = useState('')
  const [Telefono, setTelefono] = useState('')
  const [InquilinoMail, setInquilinoMail] = useState('')
  const [PriceMensual, setPriceMensual] = useState('')
  const [PorcentajeComision, setPorcentajeComision] = useState('')
  const [FechaDeComision, setFechaDeComision] = useState('')
  const [FechaInicio, setFechaInicio] = useState('')
  const [FechaFinalizacion, setFechaFinalizacion] = useState('')
  const [notes, setNotes] = useState('')
  const handleInmuebleSelect = (inmueble) => {
    setSelectedInmueble(inmueble)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const inmuebleData = selectedInmueble
      ? `${selectedInmueble.CedulaPropietario} --- ${selectedInmueble.Direccion}`
      : ''

    const data = {
      InquilinoName: inquilinoName,
      InquilinoLastName: InquilinoLastName,
      InquilinoDNI: InquilinoDNI,
      InquilinoRIF: InquilinoRIF,
      InquilinoBirthday: InquilinoBirthday,
      Telefono: Telefono,
      InquilinoMail: InquilinoMail,
      InmuebleData: inmuebleData,
      PriceMensual: PriceMensual,
      PorcentajeComision: PorcentajeComision,
      FechaDeComision: FechaDeComision,
      FechaInicio: FechaInicio,
      FechaFinalizacion: FechaFinalizacion
    }

    try {
      const response = await axiosInstance.post('/addContract', data)
      console.log('Response status:', response.status)
      console.log('Response data:', response.data)
      alert('Arriendo agregado exitosamente!')
      setModalIsOpen(false)
    } catch (error) {
      console.error('There was an error!', error)
      console.error('Response status:', error.response?.status)
      console.error('Response headers:', error.response?.headers)
      alert('Hubo un error al agregar el arriendo.')
    }
  }

  return (
    <>
      <div className="text-center mt-2">
        <button onClick={() => setModalIsOpen(true)} className="btn btn-primary">
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
              <label htmlFor="InquilinoName">Nombre del Cliente (inquilino)</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoName"
                name="InquilinoName"
                placeholder="Ingrese el nombre del cliente"
                value={inquilinoName}
                onChange={(e) => setInquilinoName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InquilinoLastName">Apellido del Cliente (inquilino)</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoLastName"
                name="InquilinoLastName"
                value={InquilinoLastName}
                onChange={(e) => setInquilinoLastName(e.target.value)}
                placeholder="Ingrese el Apellido del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InquilinoDNI">Cedula</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoDNI"
                value={InquilinoDNI}
                onChange={(e) => setInquilinoDNI(e.target.value)}
                name="InquilinoDNI"
                placeholder="Ingrese la cedula del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InquilinoRIF">Rif</label>
              <input
                type="text"
                className="form-control"
                id="InquilinoRIF"
                value={InquilinoRIF}
                onChange={(e) => setInquilinoRIF(e.target.value)}
                name="InquilinoRIF"
                placeholder="Ingrese el rif del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InquilinoMail">Correo</label>
              <input
                type="email"
                className="form-control"
                id="InquilinoMail"
                name="InquilinoMail"
                value={InquilinoMail}
                onChange={(e) => setInquilinoMail(e.target.value)}
                placeholder="Ingrese el Email del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Telefono">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="Telefono"
                value={Telefono}
                onChange={(e) => setTelefono(e.target.value)}
                name="Telefono"
                placeholder="Ingrese el telefono del cliente"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InquilinoBirthday">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="InquilinoBirthday"
                value={InquilinoBirthday}
                onChange={(e) => setInquilinoBirthday(e.target.value)}
                name="InquilinoBirthday"
                placeholder="Ingrese su fecha de nacimiento"
              />
            </div>
            <div className="container">
              <InmuebleAutocomplete onSelect={handleInmuebleSelect} />
            </div>
            <div className="form-group">
              <label htmlFor="PriceMensual">Precio (mensual)</label>
              <input
                type="text"
                className="form-control"
                id="PriceMensual"
                value={PriceMensual}
                onChange={(e) => setPriceMensual(e.target.value)}
                name="PriceMensual"
                placeholder="Ingrese el precio del inmueble"
              />
            </div>
            <div className="form-group">
              <label htmlFor="PorcentajeComision">Porcentaje de la comisión</label>
              <input
                type="text"
                className="form-control"
                id="PorcentajeComision"
                name="PorcentajeComision"
                value={PorcentajeComision}
                onChange={(e) => setPorcentajeComision(e.target.value)}
                placeholder="Ingrese la comisión para la empresa"
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="FechaDeComision">Cuando cobrar la comisión</label>
              <input
                type="date"
                className="form-control"
                value={FechaDeComision}
                onChange={(e) => setFechaDeComision(e.target.value)}
                id="FechaDeComision"
                name="FechaDeComision"
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="FechaInicio">Fecha de inicio</label>
              <input
                type="date"
                className="form-control"
                id="FechaInicio"
                name="FechaInicio"
                value={FechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="Ingrese la fecha de inicio "
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="FechaFinalizacion">Fecha de finalización</label>
              <input
                type="date"
                className="form-control"
                value={FechaFinalizacion}
                onChange={(e) => setFechaFinalizacion(e.target.value)}
                id="FechaFinalizacion"
                name="FechaFinalizacion"
                placeholder="Ingrese la fecha de finalización"
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notas</label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
