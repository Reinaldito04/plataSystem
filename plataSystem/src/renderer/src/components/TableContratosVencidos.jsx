import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import ResumenContract from './ResumenContract' // Importa el componente de resumen
import './styles/AddArriendo.css'

Modal.setAppElement('#root') // Esto asegura que el modal sepa cuál es el root de la app

function TableContratosVencidos() {
  const [filterText, setFilterText] = useState('')
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isResumenModalOpen, setIsResumenModalOpen] = useState(false) // Estado para el modal de resumen
  const [pagos, setPagos] = useState([]) // Datos de los pagos
  const [selectedContratoID, setSelectedContratoID] = useState(null)

  // Abrir el modal de pagos y cargar los pagos vinculados al contrato
  const openModal = (contratoID) => {
    setSelectedContratoID(contratoID)
    axiosInstance
      .get(`/getPays/${contratoID}`)
      .then((response) => {
        setPagos(response.data)
        setIsModalOpen(true) // Abrir el modal de pagos
      })
      .catch((error) => {
        console.error('Error fetching payments:', error)
      })
  }

  // Abrir el modal del resumen del contrato
  const openResumenModal = (contratoID) => {
    setSelectedContratoID(contratoID)
    setIsResumenModalOpen(true) // Abrir el modal de resumen
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeResumenModal = () => {
    setIsResumenModalOpen(false)
  }

  const columns = [
    {
      name: 'ID del Contrato',
      selector: (row) => row.ContratoID,
      sortable: true,
      filterable: true
    },
    {
      name: 'Alquilado Por',
      selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido}`,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula: {row.CedulaCliente} <br />
              Teléfono: {row.Telefono} <br />
            </>
          }
        >
          <div>{`${row.ClienteNombre} ${row.ClienteApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Propietario',
      selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido}`,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula: {row.CedulaPropietario} <br />
            </>
          }
        >
          <div>{`${row.PropietarioNombre} ${row.PropietarioApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Dirección',
      selector: (row) => row.InmuebleDireccion,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Municipio: {row.Municipio} <br />
            </>
          }
        >
          <div>{row.InmuebleDireccion}</div>
        </Tippy>
      )
    },
    {
      name: 'Desde',
      selector: (row) => row.FechaInicio,
      sortable: true,
      filterable: true
    },
    {
      name: 'Hasta',
      selector: (row) => row.FechaFin,
      sortable: true,
      filterable: true
    },
    {
      name: 'Acciones',
      selector: (row) => row.ContratoID,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <>
          <div className="container-fluid mx-auto">
            <Tippy content="Activar Contrato">
              <button className="btn btn-primary mt-2" onClick={() => handleEdit(row.ContratoID)}>
                Activar Contrato
              </button>
            </Tippy>
            <Tippy content="Ver Pagos">
              <button
                className="btn btn-secondary mx-auto mt-2 "
                onClick={() => openModal(row.ContratoID)}
              >
                Ver Pagos
              </button>
            </Tippy>
            <Tippy content="Ver Resumen">
              <button
                className="btn btn-info mx-auto mt-2 "
                onClick={() => openResumenModal(row.ContratoID)}
              >
                Ver Resumen
              </button>
            </Tippy>
          </div>
        </>
      )
    }
  ]

  const handleEdit = (id) => {
    axiosInstance.put(`/contract-activar/${id}`)
    alert('Contrato activado')
    window.location.reload()
  }

  useEffect(() => {
    axiosInstance
      .get('/contracts/Vencidos')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])

  const filteredItems = data.filter((item) => {
    const fullNameCliente = `${item.ClienteNombre} ${item.ClienteApellido}`.toLowerCase()
    const fullNamePropietario =
      `${item.PropietarioNombre} ${item.PropietarioApellido}`.toLowerCase()
    return (
      fullNameCliente.includes(filterText.toLowerCase()) ||
      fullNamePropietario.includes(filterText.toLowerCase()) ||
      item.InmuebleDireccion?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaInicio?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaFin?.toLowerCase().includes(filterText.toLowerCase())
    )
  })

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataTable columns={columns} data={filteredItems} pagination />

      {/* Modal para mostrar los pagos */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => closeModal(false)}>
            X
          </button>
        </div>
        <h2>Pagos vinculados al contrato</h2>
        {pagos.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Modalidad</th>
                <th>Tipo de pago</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago, index) => (
                <tr key={index}>
                  <td>{pago.Fecha}</td>
                  <td>{pago.Monto}$</td>
                  <td>{pago.Metodo}</td>
                  <td>{pago.TipoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pagos vinculados a este contrato.</p>
        )}
        <button onClick={closeModal} className="btn btn-secondary">
          Cerrar
        </button>
      </Modal>

      {/* Modal para mostrar el resumen del contrato */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={isResumenModalOpen}
        onRequestClose={closeResumenModal}
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => closeResumenModal(false)}>
            X
          </button>
        </div>
        <h2>Resumen del Contrato</h2>
        {selectedContratoID && <ResumenContract IdContract={selectedContratoID} />}
        <button onClick={closeResumenModal} className="btn btn-secondary">
          Cerrar
        </button>
      </Modal>
    </>
  )
}

export default TableContratosVencidos
