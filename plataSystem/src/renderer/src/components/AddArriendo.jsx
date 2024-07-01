import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import axiosInstance from '../utils/BackendConfig'

function AddArriendo() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [commissionModalIsOpen, setCommissionModalIsOpen] = useState(false)
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
  const [commissionDates, setCommissionDates] = useState([])

  const handleInmuebleSelect = (inmueble) => {
    setSelectedInmueble(inmueble)
  }

  const handleAddCommissionDate = (date) => {
    setCommissionDates([...commissionDates, date])
    setCommissionModalIsOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Construye la información del inmueble seleccionado o vacío si no hay uno seleccionado
    const inmuebleData = selectedInmueble
      ? `${selectedInmueble.CedulaPropietario} --- ${selectedInmueble.Direccion}`
      : ''

    // Construye el objeto de datos a enviar al backend
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
      FechaFinalizacion: FechaFinalizacion,
      comisiones: commissionDates // Asumiendo que commissionDates es una lista válida de fechas
    }

    // Console logs para verificar los datos antes de enviar la solicitud
    console.log('Data a enviar:', data)
    console.log('Fechas de comisiones:', commissionDates)

    try {
      // Realiza la solicitud POST al endpoint /addContract
      const response = await axiosInstance.post('/addContract', data)
      console.log('Response status:', response.status)
      console.log('Response data:', response.data)

      // Muestra una alerta al usuario indicando que el arriendo se agregó exitosamente
      alert('Arriendo agregado exitosamente!')

      // Cierra el modal después de agregar exitosamente el arriendo
      setModalIsOpen(false)
    } catch (error) {
      // Manejo de errores si la solicitud falla
      console.error('Ocurrió un error!', error)
      console.error('Status de respuesta:', error.response?.status)
      console.error('Headers de respuesta:', error.response?.headers)

      // Muestra una alerta al usuario indicando que hubo un error al agregar el arriendo
      alert('Hubo un error al agregar el arriendo.')
    }
  }
  const clear = () => {
    setCommissionModalIsOpen(false)
    setInquilinoName('')
    setInquilinoLastName('')
    setInquilinoDNI('')
    setInquilinoRIF('')
    setInquilinoBirthday('')
    setTelefono('')
    setInquilinoMail('')
    setPriceMensual('')
    setPorcentajeComision('')
    setFechaDeComision('')
    setFechaInicio('')
    setFechaFinalizacion('')
    setSelectedInmueble(null)
    setCommissionDates([])
  }

  useEffect(() => {
    if (modalIsOpen == false) {
      setModalIsOpen(false)
      clear()
    }
  }, [modalIsOpen])

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
        contentLabel="Añadir Arriendo"
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
              <label htmlFor="FechaDeComision">Primer Pago</label>
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
            <div className="container-fluid mt-2 ">
              <div className="d-flex mx-auto align-items-center justify-content-around">
                <label htmlFor="CommissionDates ">Fechas de Comisiones</label>
                <button
                  type="button"
                  className="btn btn-secondary mt-2 "
                  onClick={() => setCommissionModalIsOpen(true)}
                >
                  Añadir Fechas de Comisión
                </button>
              </div>

              <div className="container-fluid p-2">
                <ul>
                  {commissionDates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mx-auto d-flex justify-content-around">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => clear()}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="custom-modal modalCommission"
        overlayClassName="custom-overlay"
        isOpen={commissionModalIsOpen}
        onRequestClose={() => setCommissionModalIsOpen(false)}
        contentLabel="Añadir Fechas de Comisión"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setCommissionModalIsOpen(false)}>
            X
          </button>
        </div>

        <div className="modal-content">
          <h2>Añadir Fecha de Comisión</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const commissionDate = e.target.elements.CommissionDate.value
              if (commissionDate) {
                handleAddCommissionDate(commissionDate)
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="CommissionDate">Fecha de Comisión</label>
              <input
                type="date"
                className="form-control"
                id="CommissionDate"
                name="CommissionDate"
                placeholder="Ingrese la fecha de la comisión"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Añadir
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default AddArriendo
