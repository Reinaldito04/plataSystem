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
    selector: (row) => row.ID,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.ID}>
        <div>{row.ID}</div>
      </Tippy>
    )
  },
  {
    name: 'Nombre',
    selector: (row) => row.Name,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Name}>
        <div>{row.Name}</div>
      </Tippy>
    )
  },
  {
    name: 'Apellido',
    selector: (row) => row.Lastname,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Lastname}>
        <div>{row.Lastname}</div>
      </Tippy>
    )
  },
  {
    name: 'DNI',
    selector: (row) => row.DNI,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.DNI}>
        <div>{row.DNI}</div>
      </Tippy>
    )
  },
  {
    name: 'Monto',
    selector: (row) => row.Amount,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Amount}>
        <div>{row.Amount}</div>
      </Tippy>
    )
  },
  {
    name: 'Fecha',
    selector: (row) => row.Date,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Date}>
        <div>{row.Date}</div>
      </Tippy>
    )
  },
  {
    name: 'Tipo de pago',
    selector: (row) => row.TypePay,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.TypePay}>
        <div>{row.TypePay}</div>
      </Tippy>
    )
  },
  {
    name: 'ID del contrato',
    selector: (row) => row.IdContract,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.IdContract}>
        <div>{row.IdContract}</div>
      </Tippy>
    )
  }
]

function TablePagosInquilinos({ Tipo }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [contrato, setContrato] = useState(null)
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')
  const [tipoPago, setTipoPago] = useState('')
  const [montoContrato, setMontoContrato] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filterBy, setFilterBy] = useState('Tipo de pago')
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/getPays?type=${Tipo}`)
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Tipo === 'Personal') {
      setTipoPago('Pago hacia propietario')
    }
    fetchData()
  }, [Tipo])
  const handlePagoSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        IdContract: contrato?.ContratoID,
        Date: fecha,
        Amount: monto,
        PaymentType: Tipo,
        TypePay: tipoPago
      }
      const response = await axiosInstance.post('/PayRental', payload)
      console.log('Pago registrado exitosamente:', response.data)

      // Extraer información de la respuesta
      const { message, status, deuda_pendiente } = response.data

      // Crear mensaje personalizado para la alerta
      let alertMessage = `${message}\nEstado: ${status}`
      if (deuda_pendiente > 0) {
        alertMessage += `\nDeuda pendiente: ${deuda_pendiente}`
      }

      // Mostrar alerta con la información del pago
      if ((Tipo == 'Empresa') & (tipoPago == 'Arrendamiento')) {
        alert(alertMessage)
      }

      setModalIsOpen(false)
      setFecha('')
      setMonto('')
      setTipoPago('')
      setContrato(null)

      setMontoContrato(null)

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
    setMontoContrato(inmueble.Monto)
  }
  const filteredData = data.filter((item) => {
    switch (filterBy) {
      case 'Nombre y apellido':
        return (
          item.Name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.Lastname.toLowerCase().includes(searchText.toLowerCase())
        )
      case 'Tipo de pago':
        return item.TypePay.toLowerCase().includes(searchText.toLowerCase())
      case 'Fecha':
        return item.Date.includes(searchText)
      case 'Monto':
        return item.Amount.toString().includes(searchText)
      default:
        return true
    }
  })

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
        <div style={{ marginBottom: '10px', padding: '5px' }}>
          <label htmlFor="filterBy">Filtrar por:</label>
          <select
            id="filterBy"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="Tipo de pago">Tipo de pago</option>
            <option value="Nombre y apellido">Nombre y apellido</option>
            <option value="Fecha">Fecha</option>
            <option value="Monto">Monto</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <DataTable
          columns={columns}
          selectableRowsVisibleOnly
          selectableRows
          data={filteredData}
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
              <ContractAutoComplect onSelect={handleContratoSelect} Monto={'si'} />
            </div>
            <div className="form-group">
              <label htmlFor="mount">Monto</label>
              <input
                type="number"
                className="form-control"
                placeholder={`Monto : ${montoContrato}`}
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                id="mount"
              />
            </div>
            {Tipo === 'Empresa' && (
              <div className="form-group">
                <label htmlFor="description">Tipo de Pago</label>
                <select
                  onChange={(e) => setTipoPago(e.target.value)}
                  className="form-control"
                  id="description"
                  value={tipoPago}
                >
                  <option value="Arrendamiento">Canon de Arrendamiento</option>
                  <option value="Deposito De Garantia">Deposito en Garantia</option>
                  <option value="Honorarios">Honorarios Inmobiliarios</option>
                  <option value="Documento Legal">Documento Legal</option>
                </select>
              </div>
            )}
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

TablePagosInquilinos.propTypes = {
  Tipo: PropTypes.string.isRequired
}

export default TablePagosInquilinos
