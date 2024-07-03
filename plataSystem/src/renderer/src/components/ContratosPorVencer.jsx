import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import RenovarContrato from './RenovarContrato'
import './styles/AddArriendo.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const ContratosPorVencer = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])
  const MySwal = withReactContent(Swal)
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

  const openModal = (row) => {
    setSelectedRow(row)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedRow(null)
  }
  const desactivarContrato = async (row) => {
    MySwal.fire({
      title: '¿Estas seguro de desactivar este contrato?',
      text: 'No se eliminara información vinculada a este contrato',
      icon: 'warning',

      showCancelButton: true,
      cancelButtonText: 'No, no desactivar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .put(`/contract-desactivar/${row.ContratoID}`)
          .then((response) => {
            console.log(response.data)
            MySwal.fire({
              title: 'Contrato desactivado',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch((error) => {
            console.error('Error al desactivar el contrato:', error)
            alert('Hubo un error al desactivar el contrato. Inténtalo de nuevo más tarde.')
          })
      }
    })
  }

  const columns = [
    {
      name: 'Propietario',
      selector: (row) =>
        `${row.PropietarioNombre} ${row.PropietarioApellido} C.I: ${row.CedulaPropietario} `,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              C.I : {row.CedulaPropietario} <br />
              Telefono : {row.Telefono} <br />
            </>
          }
        >
          <div>{`${row.PropietarioNombre} ${row.PropietarioApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Cliente',
      selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido} C.I : ${row.CedulaCliente} `,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy
          content={
            <>
              C.I : {row.CedulaCliente} <br />
              Telefono : {row.Telefono} <br />
            </>
          }
        >
          <div>{`${row.ClienteNombre} ${row.ClienteApellido}`}</div>
        </Tippy>
      )
    },
    {
      name: 'Inmueble Direccion',
      selector: (row) => row.InmuebleDireccion,
      sortable: true,
      filterable: true,
      cell: (row) => (
        <Tippy content={row.Municipio}>
          <div>{row.InmuebleDireccion}</div>
        </Tippy>
      )
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => row.FechaInicio,
      sortable: true,
      filterable: true
    },
    {
      name: 'Fecha Fin',
      selector: (row) => row.FechaFin,
      sortable: true,
      filterable: true
    },
    {
      name: 'ID del contrato',
      selector: (row) => row.ContratoID,
      sortable: true,
      filterable: true
    },
    {
      name: 'Acciones',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      cell: (row) => (
        <div className="container-fluid">
          <button className="btn btn-primary botonHome" onClick={() => openModal(row)}>
            Renovar Contrato
          </button>
          <button className="btn btn-danger botonHome" onClick={() => desactivarContrato(row)}>
            Deshabilitar
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <h3 className="text-center">Contratos Por Vencer</h3>
      <DataTable columns={columns} data={data} pagination />

      <RenovarContrato isOpen={modalIsOpen} onRequestClose={closeModal} Contrato={selectedRow} />
    </>
  )
}

export default ContratosPorVencer
