import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'

import './styles/AddArriendo.css'

function TableInquilinos() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [dataPays, setDataPays] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`deleteInquilino/${id}`)
    if (response.status === 200) {
      const newData = data.filter((item) => item.id !== id)
      setData(newData)
      alert('Fue eliminado correctamente')
    } else {
      alert('Ocurrio un error')
      console.log(response)
    }
  }

  const openModal = async (tenant) => {
    setSelectedTenant(tenant)
    setIsOpen(true) // Abre el modal antes de cargar los datos
    try {
      const response = await axiosInstance.get(`/getPaysInquilino/${tenant.id}`)
      setDataPays(response.data)
      console.log(response.data)
    } catch (err) {
      console.error('Error al cargar los pagos:', err)
    }
  }

  const onRequestClose = () => {
    setIsOpen(false)
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
          <button
            className="btn btn-primary"
            onClick={() => openModal(row)} // Abrir el modal con los datos del inquilino
          >
            Ver Pagos
          </button>
        </div>
      )
    }
  ]

  return (
    <>
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
            <h2 className=" text-center">
              Pagos de {selectedTenant?.name} {selectedTenant?.lastName}
            </h2>
          </div>
          <div className="modal-body">
            {dataPays && dataPays.length > 0 ? (
              <DataTable
                columns={columnsPays}
                data={dataPays}
                pagination
                paginationPerPage={5} // Elementos por página
                paginationRowsPerPageOptions={[5, 10, 15, 20]} // Opciones de elementos por página
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
    </>
  )
}

export default TableInquilinos
