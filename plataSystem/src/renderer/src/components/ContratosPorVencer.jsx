import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
const columns = [
  {
    name: 'Propietario',
    selector: (row) =>
      `${row.PropietarioNombre} ${row.PropietarioApellido} C.I: ${row.CedulaPropietario} `,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Cliente',
    selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido} C.I : ${row.CedulaCliente} `,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Inmueble Direccion',
    selector: (row) => row.InmuebleDireccion,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Fecha Inicio',
    selector: (row) => row.FechaInicio,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Fecha Fin',
    selector: (row) => row.FechaFin,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'ID del contrato',
    selector: (row) => row.ContratoID,
    sortable: true,
    filterable: true
  }
]
export default function ContratosPorVencer() {
  const [data, setData] = useState([])
  useEffect(() => {
    axiosInstance
      .get('/contracts-expiring')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])
  return (
    <>
      <h3 className="text-center">Contratos Por Vencer</h3>
      <DataTable columns={columns} data={data} pagination />
    </>
  )
}
