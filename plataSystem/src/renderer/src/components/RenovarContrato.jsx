import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'

Modal.setAppElement('#root') // Asegúrate de que el selector se ajuste a tu estructura de proyecto

const RenovarContrato = ({ isOpen, onRequestClose, Contrato }) => {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [monto, setMonto] = useState('')

  const handleRenew = async () => {
    try {
      if (!Contrato || !Contrato.ContratoID) {
        console.error('El contrato no es válido para renovar:', Contrato)
        return
      }

      // Determina el monto a enviar
      const montoRenovacion = monto !== '' ? parseFloat(monto) : Contrato.Monto

      const response = await axiosInstance.put(`/contract/renew`, {
        ID: Contrato.ContratoID,
        FechaInicio: fechaInicio,
        FechaFin: fechaFin,
        Monto: montoRenovacion
      })

      console.log(response.data)
      onRequestClose() // Cerrar modal al finalizar
    } catch (error) {
      console.error('Error al renovar el contrato:', error)
    }
  }

  return (
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
            <label htmlFor="monto">Monto, monto actual : {Contrato.Monto}$</label>
            <input
              type="number"
              className="form-control"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
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
  )
}

RenovarContrato.propTypes = {
  Contrato: PropTypes.object,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
}

export default RenovarContrato
