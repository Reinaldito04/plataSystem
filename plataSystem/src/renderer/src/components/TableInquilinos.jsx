import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import ResumenContract from './ResumenContract'
import './styles/AddArriendo.css'

function TableInquilinos() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [dataPays, setDataPays] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [contractsData, setContractsData] = useState([])
  const [isContractsModalOpen, setIsContractsModalOpen] = useState(false)
  const [isContractDetailsModalOpen, setIsContractDetailsModalOpen] = useState(false) // Nuevo estado para el modal de detalles del contrato
  const [selectedContract, setSelectedContract] = useState(null) // Nuevo estado para el contrato seleccionado

  const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`deleteInquilino/${id}`)
    if (response.status === 200) {
      const newData = data.filter((item) => item.id !== id)
      setData(newData)
      alert('Fue eliminado correctamente')
    } else {
      alert('Ocurrió un error')
      console.log(response)
    }
  }

  const openModal = async (tenant) => {
    setSelectedTenant(tenant)
    setIsOpen(true)
    try {
      const response = await axiosInstance.get(`/getPaysInquilino/${tenant.id}`)
      setDataPays(response.data)
      console.log(response.data)
    } catch (err) {
      console.error('Error al cargar los pagos:', err)
    }
  }

  const openContractsModal = async (tenant) => {
    setSelectedTenant(tenant)
    setIsContractsModalOpen(true)
    try {
      const response = await axiosInstance.get(`/contracts/getUser/${tenant.id}`)
      setContractsData(response.data)
      console.log(response.data)
    } catch (err) {
      console.error('Error al cargar los contratos:', err)
    }
  }

  const openContractDetailsModal = (contract) => {
    setSelectedContract(contract) // Almacena el contrato seleccionado
    setIsContractDetailsModalOpen(true) // Abre el modal de detalles
  }

  const onRequestClose = () => {
    setIsOpen(false)
  }

  const onContractsModalClose = () => {
    setIsContractsModalOpen(false)
  }

  const onContractDetailsModalClose = () => {
    setIsContractDetailsModalOpen(false) // Cierra el modal de detalles del contrato
  }

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const filteredData = data.filter((item) => {
    const fullName = `${item.name} ${item.lastName}`.toLowerCase()
    const dni = item.dni.toLowerCase()
    return fullName.includes(filterText.toLowerCase()) || dni.includes(filterText.toLowerCase())
  })

  const columnsPays = [
    {
      name: 'Contrato ID',
      selector: (row) => row.ContratoID,
      sortable: true
    },
    {
      name: 'Monto',
      selector: (row) => `$${row.Monto}`,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: (row) => row.Fecha,
      sortable: true
    },
    {
      name: 'Para',
      selector: (row) => row.Para,
      sortable: true
    },
    {
      name: 'Tipo de Pago',
      selector: (row) => row.TipoPago,
      sortable: true
    },
    {
      name: 'Método',
      selector: (row) => row.Metodo,
      sortable: true
    }
  ]

  const columnsContracts = [
    {
      name: 'Contrato ID',
      selector: (row) => row.ContratoID,
      sortable: true
    },
    {
      name: 'Propietario',
      selector: (row) => (
        <Tippy
          content={
            <>
              Cedula : {row.CedulaPropietario} <br />
              Telefono : {row.Telefono} <br />
            </>
          }
        >
          <div>{`${row.PropietarioNombre} ${row.PropietarioApellido}`}</div>
        </Tippy>
      ),
      sortable: true
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => row.FechaInicio,
      sortable: true
    },
    {
      name: 'Fecha Fin',
      selector: (row) => row.FechaFin,
      sortable: true
    },
    {
      name: 'Inmueble ',
      selector: (row) => row.InmuebleDireccion,
      sortable: true
    },
    {
      name: 'Estado del Contrato',
      selector: (row) => row.Estado,
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button
          className="btn btn-info"
          onClick={() => openContractDetailsModal(row)} // Abre el modal de detalles del contrato
        >
          Ver Resumen
        </button>
      )
    }
  ]

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
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteUser(row.id)
            }}
          >
            Eliminar
          </button>
          <button className="btn btn-primary" onClick={() => openModal(row)}>
            Ver Pagos
          </button>
          <button className="btn btn-secondary" onClick={() => openContractsModal(row)}>
            Ver Contratos
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por nombre o DNI..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />

      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por página:',
            rangeSeparatorText: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false
          }}
        />
      </div>

      {/* Modal para ver pagos */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Ejemplo de Modal"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={onRequestClose}>
            X
          </button>
        </div>
        <div className="modal-content">
          <div className="">
            <h2 className="text-center">
              Pagos de {selectedTenant?.name} {selectedTenant?.lastName}
            </h2>
          </div>
          <div className="modal-body">
            {dataPays && dataPays.length > 0 ? (
              <DataTable
                columns={columnsPays}
                data={dataPays}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationComponentOptions={{
                  rowsPerPageText: 'Filas por página:',
                  rangeSeparatorText: 'de',
                  noRowsPerPage: false,
                  selectAllRowsItem: false
                }}
              />
            ) : (
              <p>Cargando pagos...</p>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal para ver contratos */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={isContractsModalOpen}
        onRequestClose={onContractsModalClose}
        contentLabel="Contratos del Inquilino"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={onContractsModalClose}>
            X
          </button>
        </div>
        <div className="modal-content">
          <div className="">
            <h2 className="text-center">
              Contratos de {selectedTenant?.name} {selectedTenant?.lastName}
            </h2>
          </div>
          <div className="modal-body">
            {contractsData && contractsData.length > 0 ? (
              <DataTable
                columns={columnsContracts}
                data={contractsData}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationComponentOptions={{
                  rowsPerPageText: 'Filas por página:',
                  rangeSeparatorText: 'de',
                  noRowsPerPage: false,
                  selectAllRowsItem: false
                }}
              />
            ) : (
              <p>Cargando contratos...</p>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal para ver detalles del contrato */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={isContractDetailsModalOpen}
        onRequestClose={onContractDetailsModalClose}
        contentLabel="Detalles del Contrato"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={onContractDetailsModalClose}>
            X
          </button>
        </div>
        <div className="modal-content">
          <div className="">
            <h2 className="text-center">Detalles del Contrato {selectedContract?.ContratoID}</h2>
          </div>
          <div className="modal-body">
            {selectedContract ? (
              <>
                <ResumenContract IdContract={selectedContract.ContratoID} />
              </>
            ) : (
              <p>Cargando detalles del contrato...</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TableInquilinos
