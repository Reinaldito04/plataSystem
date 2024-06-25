import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import ContractAutoComplect from './AutoCompletedContract'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import PropTypes from 'prop-types'

const columns = [
  {
    name: 'ID',
    selector: (row) => row.Payment.PaymentID,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Payment.PaymentID}>
        <div>{row.Payment.PaymentID}</div>
      </Tippy>
    )
  },
  {
    name: 'Servicio',
    selector: (row) => row.Service.Servicio,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Service.Servicio}>
        <div>{row.Service.Servicio}</div>
      </Tippy>
    )
  },
  {
    name: 'Monto',
    selector: (row) => row.Payment.MontoPago,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Payment.MontoPago}>
        <div>{row.Payment.MontoPago}</div>
      </Tippy>
    )
  },
  {
    name: 'Fecha',
    selector: (row) => row.Payment.FechaPago,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Payment.FechaPago}>
        <div>{row.Payment.FechaPago}</div>
      </Tippy>
    )
  },
  {
    name: 'Numero de cuenta',
    selector: (row) => row.Service.NumeroCuenta,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Service.NumeroCuenta}>
        <div>{row.Service.NumeroCuenta}</div>
      </Tippy>
    )
  },
  {
    name: 'Inmueble Dirección',
    selector: (row) => row.Inmueble.Direccion,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Inmueble.Direccion}>
        <div>{row.Inmueble.Direccion}</div>
      </Tippy>
    )
  },
  {
    name: 'ID del contrato',
    selector: (row) => row.Payment.ContratoID,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Payment.ContratoID}>
        <div>{row.Payment.ContratoID}</div>
      </Tippy>
    )
  }
]

function PagosServicios() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [contrato, setContrato] = useState(null)
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')
  const [concept, setConcept] = useState('')
  const [servicios, setServicios] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/getServicesPays')
      setData(response.data)
      console.log(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const fetchDataService = async (id) => {
    try {
      const response = await axiosInstance.get(`/getServices?inmueble_id=${id}`)
      setServicios(response.data.services)
      console.log(servicios)
    } catch (err) {
      setError(err.message)
    }
  }
  useEffect(() => {
    fetchData() // Llama a fetchData directamente aquí, sin agregarlo como una dependencia
  }, [])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }
  const handlePagoSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        contratoID: contrato?.ContratoID,
        fecha: fecha,
        Monto: monto,
        concepto: concept,
        servicioID: selectedOption
      }
      const response = await axiosInstance.post('/addPayService', payload)
      console.log('Pago registrado exitosamente:', response.data)

      // Mostrar alerta con la información del pago
      alert('Pago realizado correctamente')

      setModalIsOpen(false)
      setFecha('')
      setMonto('')
      setContrato(null)
      setConcept('')
      setSelectedOption('')

      fetchData()
    } catch (error) {
      console.error('Error al registrar el pago:', error)
      alert('Error al registrar el pago')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const handleContratoSelect = (inmueble) => {
    setContrato(inmueble)
    fetchDataService(inmueble.InmuebleID)
  }

  return (
    <>
      <div className="container-boton">
        <button
          onClick={() => {
            setModalIsOpen(true)
          }}
          className="btn btn-success"
        >
          Nuevo
        </button>
      </div>
      <div style={{ width: '800px', overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          selectableRowsVisibleOnly
          selectableRows
          data={data}
          pagination
        />
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
          <h2 className="text-center">Añadir Pago</h2>
          <form onSubmit={handlePagoSubmit}>
            <div className="justify-content-center align-center mx-auto">
              <ContractAutoComplect onSelect={handleContratoSelect} />
            </div>
            <div className="form-group">
              <label htmlFor="contrato">Servicio</label>
              <select
                name="servicio"
                id="servicio"
                className="form-control"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.ID} value={servicio.ID}>
                    {servicio.Servicio} - Proveedor :{servicio.Proveedor} - Monto : {servicio.Monto}
                  </option>
                ))}
              </select>
              {error && <p className="error">{error}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="concept">Concepto</label>
              <input
                type="text"
                className="form-control"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                id="concept"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mount">Monto</label>
              <input
                type="number"
                className="form-control"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                id="mount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="form-control"
                id="date"
              />
            </div>
            <div className="container-boton mt-3 mx-auto text-center">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

PagosServicios.propTypes = {
  Tipo: PropTypes.string.isRequired
}

export default PagosServicios
