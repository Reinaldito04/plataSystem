import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function PagosGarantia() {
  const [pendientes, setPendientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [monto, setMonto] = useState(0)
  const MySwal = withReactContent(Swal)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])
  useEffect(() => {
    // Fetch pending payments from the endpoint
  }, [])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/getPaysGaranty')
      setPendientes(response.data)
      setLoading(false)
      const totalMonto = response.data.reduce((acc, payment) => acc + payment.Monto, 0)
      setMonto(totalMonto)
    } catch (error) {
      setError('Error al cargar los pagos pendientes')
      setLoading(false)
      setMonto(0)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <p>Cargando pagos pendientes...</p>
  }

  if (error) {
    return <p>{error}</p>
  }
  const handlePagoDelete = async (row) => {
    try {
      MySwal.fire({
        title: '¿Estás seguro de eliminar este pago?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        // Corrige aquí el paréntesis
        if (result.isConfirmed) {
          axiosInstance.delete(`/deletePay/${row.ID}`).then((response) => {
            console.log(response.data)
            alert('Eliminado correctamente')
            fetchData()
          })
          axiosInstance
            .post('/addInformation', {
              username: username,
              description: `Se elimino el pago de garantia del contrato con ID : ${row.IDContrato} con monto de ${row.Monto}$`
            })
            .catch((error) => {
              console.error('Error al eliminar el pago:', error)
              alert('Error al eliminar el pago')
            })
        }
      })
    } catch (error) {
      console.error('Error en el manejo de la eliminación del pago:', error)
    }
  }
  const columns = [
    {
      name: 'ID Contrato',
      selector: (row) => row.IDContrato,
      sortable: true
    },
    {
      name: 'Cliente',
      selector: (row) => row.ClienteNombre,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula : {row.ClienteDNI} <br />
            </>
          }
        >
          <div>{`${row.ClienteNombre} ${row.ClienteApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Propietario',
      selector: (row) => row.PropietarioNombre,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Cedula : {row.PropietarioDNI} <br />
            </>
          }
        >
          <div>{`${row.PropietarioNombre} ${row.PropietarioApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Monto de garantia',
      selector: (row) => row.Monto,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Monto : {row.Monto} <br />
            </>
          }
        >
          <div>{`${row.Monto}$ `}</div>
        </Tippy>
      )
    },
    {
      name: 'Fecha de pago',
      selector: (row) => row.Fecha,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Fecha : {row.Fecha} <br />
            </>
          }
        >
          <div>{`${row.Fecha} `}</div>
        </Tippy>
      )
    },
    {
      name: 'Metodo de pago',
      selector: (row) => row.Metodo,
      sortable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              Metodo de pago : {row.Metodo} <br />
            </>
          }
        >
          <div>{`${row.Metodo} `}</div>
        </Tippy>
      )
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button
          onClick={() => {
            handlePagoDelete(row)
          }}
          className="btn btn-danger fs-6"
        >
          Eliminar
        </button>
      )
    }
  ]

  return (
    <div>
      <div className="container-fluid">
        {pendientes.length > 0 ? (
          <>
            <DataTable columns={columns} data={pendientes} pagination />
            <p>Total en Garantia : ${monto} </p>
          </>
        ) : (
          <p>No hay pagos en garantia.</p>
        )}
      </div>
    </div>
  )
}

export default PagosGarantia
