import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

function TableContratosVencidos() {
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
      filterable: true, // Habilita el filtro para esta columna
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula: {row.CedulaCliente} <br />
              Telefono: {row.Telefono} <br />
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

      // Habilita el filtro para esta columna
    },
    {
      name: 'Direccion',
      selector: (row) => row.InmuebleDireccion,
      sortable: true,
      filterable: true, // Habilita el filtro para esta columna
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
      filterable: true // Habilita el filtro para esta columna
    },
    {
      name: 'Hasta',
      selector: (row) => row.FechaFin,
      sortable: true,
      filterable: true // Habilita el filtro para esta columna
    },

    {
      name: 'Acciones',
      selector: (row) => row.ContratoID,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy content="Activar Contrato">
          <button className="btn btn-primary" onClick={() => handleEdit(row.ContratoID)}>
            Activar Contrato
          </button>
        </Tippy>
      )

      // Habilita el filtro para esta columna
    }
  ]

  const handleEdit = (id) => {
    axiosInstance.put(`/contract-activar/${id}`)
    alert('Contrato activado')
    window.location.reload()
  }
  const [filterText, setFilterText] = useState('')
  const [data, setData] = useState([])

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
    </>
  )
}

export default TableContratosVencidos
