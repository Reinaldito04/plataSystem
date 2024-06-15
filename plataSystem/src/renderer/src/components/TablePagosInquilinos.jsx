import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'

import ContractAutoComplect from './AutoCompletedContract'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
const columns = [
  {
    name: 'ID',
    selector: (row) => row.id,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.id}>
        <div>{row.id}</div>
      </Tippy>
    )
  },
  {
    name: 'Nombre',
    selector: (row) => row.name,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.name}>
        <div>{row.name}</div>
      </Tippy>
    )
  },
  {
    name: 'Apellido',
    selector: (row) => row.lastName,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.lastName}>
        <div>{row.lastName}</div>
      </Tippy>
    )
  },
  {
    name: 'DNI',
    selector: (row) => row.dni,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.dni}>
        <div>{row.dni}</div>
      </Tippy>
    )
  },
  {
    name: 'RIF',
    selector: (row) => row.rif,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.rif}>
        <div>{row.rif}</div>
      </Tippy>
    )
  },
  {
    name: 'Fecha de Nacimiento',
    selector: (row) => row.birthdate,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.birthdate}>
        <div>{row.birthdate}</div>
      </Tippy>
    )
  },
  {
    name: 'Teléfono',
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.phone}>
        <div>{row.phone}</div>
      </Tippy>
    )
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.email}>
        <div>{row.email}</div>
      </Tippy>
    )
  }
]

function TablePagosInquilinos() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [contrato, setContrato] = useState(null)
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getInquilinos')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const handlePagoSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        IdContract: contrato.ContratoID,
        Date: fecha,
        Amount: monto,
        PaymentType: 'Empresa' // Cambiar según sea necesario
      }
      const response = await axiosInstance.post('/PayRental', payload)
      console.log('Pago registrado exitosamente:', response.data)
      alert('Pago registrado exitosamente') // Mostrar alerta de éxito
      setModalIsOpen(false) // Cerrar el modal
      setFecha(null)
      setMonto(null)
      setContrato(null)
    } catch (error) {
      console.error('Error al registrar el pago:', error)
      alert('Error al registrar el pago') // Mostrar alerta de error
      // Manejo de errores, mostrar mensaje al usuario, etc.
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  const handleContratoSelect = (inmueble) => {
    setContrato(inmueble)
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
            <div className="justify-content-center align-center  mx-auto">
              <ContractAutoComplect onSelect={handleContratoSelect} />
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

export default TablePagosInquilinos
