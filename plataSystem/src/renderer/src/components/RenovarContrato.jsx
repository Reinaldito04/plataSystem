import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

Modal.setAppElement('#root') // Asegúrate de que el selector se ajuste a tu estructura de proyecto

const RenovarContrato = ({ isOpen, onRequestClose, Contrato }) => {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [monto, setMonto] = useState('')
  const [commissionDates, setCommissionDates] = useState([])
  const [commissionModalIsOpen, setCommissionModalIsOpen] = useState(false)
  const [fechaPago, setFechaPago] = useState('')
  const MySwal = withReactContent(Swal)

  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])

  const handleAddCommissionDate = (date) => {
    setCommissionDates([...commissionDates, date])
    setCommissionModalIsOpen(false)
  }

  useEffect(() => {
    if (onRequestClose) {
      setCommissionDates([])
    }
  }, [onRequestClose])

  const handleRenew = async () => {
    try {
      if (!Contrato || !Contrato.ContratoID) {
        console.error('El contrato no es válido para renovar:', Contrato)
        return
      }

      const result = await MySwal.fire({
        title: '¿Deseas vincular los pagos anteriores a este contrato?',
        text: 'O deseas crear un nuevo contrato, este se deshabilitará',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No, mantener los pagos',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear nuevo contrato!'
      })

      const montoRenovacion = monto !== '' ? parseFloat(monto) : Contrato.Monto

      const data = {
        ID: Contrato.ContratoID,
        FechaInicio: fechaInicio,
        FechaFin: fechaFin,
        Monto: montoRenovacion,
        comisiones: commissionDates,
        FechaPago: fechaPago,
        crear_nuevo: result.isConfirmed // Establece si es un nuevo contrato o no
      }

      // Realiza la solicitud de renovación o creación de contrato
      const response = await axiosInstance.put('/contract/renew', data)

      if (response.status === 200) {
        const mensaje = result.isConfirmed
          ? 'Contrato creado con éxito'
          : 'Contrato renovado con éxito'

        await MySwal.fire({
          title: mensaje,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        print(data.crear_nuevo)

        await axiosInstance.post('addInformation', {
          username: username,
          description: `Se renovó el contrato de la cédula del propietario: ${Contrato.CedulaPropietario} (${Contrato.InmuebleDireccion})`
        })

        location.reload() // Recargar la página después del éxito
      } else {
        throw new Error('Error al renovar o crear el contrato')
      }

      onRequestClose()
    } catch (error) {
      console.error('Error al renovar el contrato:', error)
      MySwal.fire({
        title: 'Error',
        text: 'Hubo un error al renovar el contrato. Inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        contentLabel="Renovar Contrato"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={onRequestClose}>
            X
          </button>
        </div>
        <h2>Renovar Contrato</h2>
        {Contrato && (
          <div className="container-fluid mx-auto">
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha de Inicio</label>
              <input
                type="date"
                className="form-control"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaFin">Fecha de Vencimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaPago">Fecha del Primer Pago</label>
              <input
                type="date"
                className="form-control"
                id="fechaPago"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="monto">Monto, monto actual: {Contrato.Monto}$</label>
              <input
                type="number"
                className="form-control"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
            <div className="container-fluid mt-2 ">
              <div className="d-flex mx-auto align-items-center justify-content-around">
                <label htmlFor="CommissionDates ">Fechas de Comisiones</label>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
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
            <div className="container text-center mx-auto mt-2">
              <button className="btn btn-success mx-auto" onClick={handleRenew}>
                Renovar
              </button>
              <button className="btn btn-danger mx-auto" onClick={onRequestClose}>
                Cancelar
              </button>
            </div>
          </div>
        )}
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

RenovarContrato.propTypes = {
  Contrato: PropTypes.object,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
}

export default RenovarContrato
