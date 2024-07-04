// src/components/UploadLegalDocument.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../utils/BackendConfig'
import DataTable from 'react-data-table-component'
import ruta from '../utils/RutaBackend'
const UploadLegalDocument = () => {
  const [casosLegales, setCasosLegales] = useState([])
  const [casoLegalID, setCasoLegalID] = useState('')
  const [nombreDocumento, setNombreDocumento] = useState('')
  const [archivo, setArchivo] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getDocumentsLegals')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching documents', error)
      }
    }
    fetchData()
  }, [])

  const columns = [
    {
      name: 'Caso Legal',
      selector: (row) => row.caso_legal_id,
      sortable: true
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: (row) => new Date(row.fecha_subida).toLocaleDateString(),
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            handleDownload(row)
          }}
        >
          Descargar
        </button>
      )
    }
  ]
  const handleDownload = (row) => {
    // Manejar la descarga del archivo
    const downloadUrl = `${ruta}/${row.ruta_archivo}`
    const dowloandLink = document.createElement('a')
    dowloandLink.href = downloadUrl
    dowloandLink.setAttribute('download', '')
    document.body.appendChild(dowloandLink)
    dowloandLink.click()
    document.body.removeChild(dowloandLink)
  }
  useEffect(() => {
    // Fetch legal cases
    const fetchCasosLegales = async () => {
      try {
        const response = await axiosInstance.get('/casos-legales')
        // Verificar que la respuesta es un arreglo
        if (Array.isArray(response.data)) {
          setCasosLegales(response.data)
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data)
        }
      } catch (error) {
        console.error('Error fetching legal cases', error)
      }
    }
    fetchCasosLegales()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', archivo)
    formData.append('casoID', casoLegalID)
    formData.append('nombre', nombreDocumento)

    try {
      const response = await axiosInstance.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMensaje('Documento subido exitosamente')

      console.log(response.data)
      setArchivo('')
      setNombreDocumento('')
      setCasoLegalID('')
    } catch (error) {
      console.error('Error uploading document', error)
      setMensaje('Error subiendo el documento')
    }
  }

  return (
    <>
      <div className="upload-legal-document">
        <h3>Subir Documento Legal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="casoLegalID">Caso Legal</label>
            <select
              id="casoLegalID"
              value={casoLegalID}
              onChange={(e) => setCasoLegalID(e.target.value)}
              className="form-control"
            >
              <option value="">Seleccione un caso legal</option>
              {casosLegales.map((caso) => (
                <option key={caso.id} value={caso.id}>
                  {caso.nombre_caso}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nombreDocumento">Nombre del Documento</label>
            <input
              type="text"
              id="nombreDocumento"
              value={nombreDocumento}
              onChange={(e) => setNombreDocumento(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="archivo">Archivo</label>
            <input
              type="file"
              id="archivo"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Subir Documento
          </button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>

      <div className="container-fluid mt-2">
        <DataTable
          columns={columns}
          title="Documentos"
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
        />
      </div>
    </>
  )
}

export default UploadLegalDocument
