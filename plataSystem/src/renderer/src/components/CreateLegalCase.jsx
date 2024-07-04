// src/components/CreateLegalCase.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContractAutoComplect from './AutoCompletedContract'
import axiosInstance from '../utils/BackendConfig'
import DataTable from 'react-data-table-component'
const CreateLegalCase = () => {
  const [contratoID, setContratoID] = useState('')
  const [nombreCaso, setNombreCaso] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [mensaje, setMensaje] = useState('')
  const [contrato, setContrato] = useState(null)
  const [data, setData] = useState([])
  const handleContratoSelect = (inmueble) => {
    setContrato(inmueble)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const nuevoCasoLegal = {
      ContratoID: contrato?.ContratoID,
      nombre_caso: nombreCaso,
      descripcion,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      estado
    }

    try {
      const response = await axiosInstance.post('/casos-legales/', nuevoCasoLegal)
      setMensaje('Caso legal creado exitosamente')

      // Limpiar el formulario
      setContratoID('')
      setNombreCaso('')
      setDescripcion('')
      setFechaInicio('')
      setFechaFin('')

      setEstado('')

      window.location.reload()
    } catch (error) {
      console.error('Error creando caso legal', error)
      setMensaje('Error creando el caso legal')
    }
  }
  useEffect(() => {
    const fetchCasosLegales = async () => {
      try {
        const response = await axiosInstance.get('/casos-legales')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching legal cases', error)
      }
    }
    fetchCasosLegales()
  }, [])
  const handleDelete = (ID) => {
    axiosInstance
      .delete(`/casos-legales-Delete/${ID}`)
      .then((response) => {
        console.log(response.data)
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const columns = [
    {
      name: 'ContratoID',
      selector: (row) => row.contrato_id,
      sortable: true
    },
    {
      name: 'Nombre del Caso',
      selector: (row) => row.nombre_caso,
      sortable: true
    },
    {
      name: 'Descripción',
      selector: (row) => row.descripcion,
      sortable: true
    },
    {
      name: 'Fecha de Inicio',
      selector: (row) => row.fecha_inicio,
      sortable: true
    },
    {
      name: 'Fecha de Fin',
      selector: (row) => row.fecha_fin,
      sortable: true
    },
    {
      name: 'Estado',
      selector: (row) => row.estado,
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => handleDelete(row.id)}>
          Eliminar
        </button>
      )
    }
  ]

  return (
    <>
      <div className="create-legal-case">
        <h3>Crear Caso Legal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <ContractAutoComplect onSelect={handleContratoSelect} />
          </div>
          <div className="form-group">
            <label htmlFor="nombreCaso">Nombre del Caso</label>
            <input
              type="text"
              id="nombreCaso"
              value={nombreCaso}
              onChange={(e) => setNombreCaso(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha de Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaFin">Fecha de Fin</label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              readOnly
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Caso
          </button>
        </form>
        {mensaje && (
          <div className="alert alert-success">
            <p>{mensaje}</p>
          </div>
        )}
      </div>
      <br />
      <DataTable title="Casos legales" columns={columns} data={data} pagination
      
      
      />
    </>
  )
}

export default CreateLegalCase
