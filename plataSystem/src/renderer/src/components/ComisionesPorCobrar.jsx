import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

function ComisionesPorCobrar() {
  const [data, setData] = useState([])

  const columns = [
    {
      name: (
        <Tippy content="ID">
          <span>ID</span>
        </Tippy>
      ),
      selector: (row) => row.ID,
      sortable: true
    },
    {
      name: (
        <Tippy content="ID Contrato">
          <span>ID Contrato</span>
        </Tippy>
      ),
      selector: (row) => row.IDContracto,
      sortable: true
    },
    {
      name: (
        <Tippy content="Propietario">
          <span>Propietario</span>
        </Tippy>
      ),
      selector: (row) => `${row.NombrePropietario}`,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula : {row.DNIPropietario} <br />
              Telefono : {row.TelefonoPropietario} <br />
            </>
          }
        >
          <div>{row.NombrePropietario}</div>
        </Tippy>
      )
    },
    {
      name: (
        <Tippy content="Inquilino">
          <span>Inquilino</span>
        </Tippy>
      ),
      selector: (row) => `${row.NombreCliente}`,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula : {row.DniCliente} <br />
              Telefono : {row.TelefonoCliente} <br />
            </>
          }
        >
          <div>{row.NombreCliente}</div>
        </Tippy>
      )
    },
    {
      name: (
        <Tippy content="Porcentaje de Comision">
          <span>Porcentaje de Comision</span>
        </Tippy>
      ),
      selector: (row) => `${row.Comision}%`,
      sortable: true
    },
    {
      name: (
        <Tippy content="Fecha al cobrar">
          <span>Fecha al cobrar</span>
        </Tippy>
      ),
      selector: (row) => row.Fecha,
      sortable: true
    },
    {
      name: (
        <Tippy content="Monto">
          <span>Monto</span>
        </Tippy>
      ),
      selector: (row) => row.Monto,
      sortable: true
    },
    {
      name: (
        <Tippy content="Inmueble">
          <span>Inmueble</span>
        </Tippy>
      ),
      selector: (row) => row.Direccion,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Direccion : {row.Direccion} <br />
              Municipio : {row.Municipio} <br />
            </>
          }
        >
          <div>{row.Direccion}</div>
        </Tippy>
      )
    }
  ]

  useEffect(() => {
    axiosInstance
      .get('/comisiones-mes-actual')
      .then((response) => {
        setData(response.data.comisiones_mes_actual)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, []) // Añadir un array de dependencias vacío para que useEffect se ejecute solo una vez

  return (
    <>
      <h3 className="text-center">Comisiones por Cobrar</h3>
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default ComisionesPorCobrar
