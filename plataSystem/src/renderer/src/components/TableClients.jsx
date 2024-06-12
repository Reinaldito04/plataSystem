// src/components/TableClients.js

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'

const columns = [
  {
    name: 'ID',
    selector: (row) => row.id,
    sortable: true
  },
  {
    name: 'Nombre',
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: 'Apellido',
    selector: (row) => row.lastName,
    sortable: true
  },
  {
    name: 'DNI',
    selector: (row) => row.dni,
    sortable: true
  },
  {
    name: 'RIF',
    selector: (row) => row.rif,
    sortable: true
  },
  {
    name: 'Fecha de Nacimiento',
    selector: (row) => row.birthdate,
    sortable: true
  },
  {
    name: 'Dirección',
    selector: (row) => row.address,
    sortable: true
  },
  {
    name: 'Teléfono',
    selector: (row) => row.phone,
    sortable: true
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true
  },
  {
    name: 'Codigo Postal',
    selector: (row) => row.codePostal,
    sortable: true
  }
]

function TableClients() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getClients')
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
    <div style={{ width: '800px', overflowX: 'auto' }}>
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}

export default TableClients
