import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

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

function TableInquilinos() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    </>
  )
}

export default TableInquilinos
