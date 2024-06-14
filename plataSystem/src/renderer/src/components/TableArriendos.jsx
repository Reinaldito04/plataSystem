import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'

const columns = [
  {
    name: 'Alquilado Por',
    selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido}`,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido}`,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Direccion',
    selector: (row) => row.InmuebleDireccion,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Desde',
    selector: (row) => row.FechaInicio,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Hasta',
    selector: (row) => row.FechaFin,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  }
]

function TableArriendos() {
  const [filterText, setFilterText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    axiosInstance
      .get('/contracts')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])

  const filteredItems = data.filter(
    (item) =>
      item.ClienteNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ClienteApellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioApellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.InmuebleDireccion.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaInicio.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaFin.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <DataTable columns={columns} data={filteredItems} pagination />
    </>
  )
}

export default TableArriendos
