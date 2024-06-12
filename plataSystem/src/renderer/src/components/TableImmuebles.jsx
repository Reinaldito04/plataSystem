// src/components/TableClients.js

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'

const columns = [
  {
    name: 'ID',
    selector: (row) => row.ID,
    sortable: true
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.NombrePropietario} ${row.ApellidoPropietario}`,
    sortable: true
  },
  {
    name: 'Direccion',
    selector: (row) => row.Direccion,
    sortable: true
  },
  {
    name: 'Tipo',
    selector: (row) => row.Tipo,
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
        const response = await axiosInstance.get('/getInmuebles')
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

  return <DataTable columns={columns} data={data} pagination />
}

export default TableClients
