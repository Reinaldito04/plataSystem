import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import RenovarContrato from './RenovarContrato'
import './styles/AddArriendo.css'

const ContratosPorVencer = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])

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

  const columns = [
    {
      name: 'Propietario',
      selector: (row) =>
        `${row.PropietarioNombre} ${row.PropietarioApellido} C.I: ${row.CedulaPropietario} `,
      sortable: true,
      filterable: true
    },
    {
      name: 'Cliente',
      selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido} C.I : ${row.CedulaCliente} `,
      sortable: true,
      filterable: true
    },
    {
      name: 'Inmueble Direccion',
      selector: (row) => row.InmuebleDireccion,
      sortable: true,
      filterable: true
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
          <button className="btn btn-danger botonHome">Deshabilitar</button>
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
