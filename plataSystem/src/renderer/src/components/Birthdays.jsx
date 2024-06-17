import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
const columns = [
  {
    name: 'Nombre',
    selector: (row) => `${row.name} ${row.lastName}`,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Cedula',
    selector: (row) => `${row.dni} `,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Cumpleaños',
    selector: (row) => row.birthdate,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Telefono',
    selector: (row) => row.phone,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Correo',
    selector: (row) => row.email,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Tipo de Cliente',
    selector: (row) => row.type,
    sortable: true,
    filterable: true
  }
]
function Birthdays() {
  const [data, setData] = useState([])
  useEffect(() => {
    axiosInstance
      .get('/getBirthdays')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])

  return (
    <>
      <h3 className="text-center">Cumpleaños de clientes</h3>
      <DataTable columns={columns} data={data} pagination />
    </>
  )
}

export default Birthdays
