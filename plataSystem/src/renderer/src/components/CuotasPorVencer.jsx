import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'

const columns = [
  {
    name: 'Propietario',
    selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido} `,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Cliente',
    selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido} `,
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
    name: 'Deuda Restante',
    selector: (row) => `${row.DeudaPendiente}$`,
    sortable: true,
    filterable: true
  },
  {
    name: 'Monto total',
    selector: (row) => ` ${row.MontoContrato}$`,
    sortable: true,
    filterable: true
  },
  {
    name: 'Dia de Pago',
    selector: (row) => row.DiaPrimerPago,
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

function CuotasPorVencer() {
  const [data, setData] = useState([])
  useEffect(() => {
    axiosInstance
      .get('/getPendingPayments')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])
  return (
    <>
      <h3 className="text-center">Cuotas Por Vencer</h3>
      <div
        style={{
          width: '1000px',
          overflowY: 'auto'
        }}
      >
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  )
}

export default CuotasPorVencer
