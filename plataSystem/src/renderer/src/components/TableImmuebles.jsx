// src/components/TableClients.js

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import './styles/AddArriendo.css'
import Modal from 'react-modal'

const columns = [
  {
    name: 'ID',
    selector: (row) => row.ID,
    sortable: true
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.NombrePropietario} ${row.ApellidoPropietario}`,
    sortable: true
  },
  {
    name: 'Direccion',
    selector: (row) => row.Direccion,
    sortable: true
  },
  {
    name: 'Tipo',
    selector: (row) => row.Tipo,
    sortable: true
  }
]

function TableImmuebles() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedOption, setSelectedOption] = useState('') // Estado para la opción seleccionada

  const handleRowClick = (row) => {
    setSelectedRow(row)
    setModalIsOpen(true)
  }

  const handleAddImages = () => {
    setSelectedOption('addImages')
  }

  const handleEdit = () => {
    setSelectedOption('edit')
  }

  const handleDelete = () => {
    setSelectedOption('delete')
  }

  const AddImagen = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageSrc, setImageSrc] = useState('')
    const [description, setDescription] = useState('')
    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedFile(file)
          setImageSrc(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
    const handleUpload = async () => {
      try {
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('idInmueble', selectedRow.ID) // Asegúrate de ajustar el nombre del campo según tu backend
        formData.append('descripcion', description) // Ajusta según tus necesidades

        const response = await axiosInstance.post('/addImagen', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        console.log('Respuesta del servidor:', response.data)
        // Aquí puedes manejar la respuesta del servidor como desees (mostrar un mensaje de éxito, actualizar datos, etc.)
        alert('Fue guardada correctamente')
        // Cierra el modal después de la operación
        setDescription('')

        setSelectedFile(null)
      } catch (error) {
        console.error('Error al subir la imagen:', error)
        // Maneja el error como desees (mostrar mensaje de error, etc.)
      }
    }

    return (
      <>
        <p className="text-center">Añadir Imágenes</p>
        <div className="container">
          <input className="form-control" type="file" onChange={handleFileChange} />
        </div>
        <div className="container form-group">
          <input
            placeholder="Descripción"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="container-img">
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="img-fluid" />
          )}
        </div>
        <div className="container text-center">
          <button className="btn btn-primary text-center mx-auto" onClick={handleUpload}>
            Añadir Imagen
          </button>
        </div>

        <div className="container text-center">
          <button
            className="btn btn-danger text-center mx-auto"
            onClick={() => setModalIsOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </>
    )
  }

  const renderOptionsContent = () => {
    switch (selectedOption) {
      case 'addImages':
        return <AddImagen />
      case 'edit':
        return <p>Contenido para editar</p>
      case 'delete':
        return <p>Contenido para eliminar</p>
      default:
        return null
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getInmuebles')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination
        onRowClicked={handleRowClick} // Asigna la función handleRowClick al evento onRowClicked
      />

      {/* Aquí puedes mostrar un modal con los detalles de la fila seleccionada */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Ejemplo de Modal"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setModalIsOpen(false)}>
            X
          </button>
        </div>
        <div className="modal-content">
          {selectedRow && (
            <>
              <h2 className="text-center">Opciones</h2>
              <h3 className="text-center">{selectedRow.Direccion}</h3>
              <div className="container-fluid mx-auto col text-center">
                <button className="btn btn-primary botonModalInmueble" onClick={handleAddImages}>
                  Añadir Imágenes
                </button>
                <button className="btn btn-primary botonModalInmueble" onClick={handleEdit}>
                  Editar
                </button>
                <button className="btn btn-danger botonModalInmueble" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
              <div className="mt-3">{renderOptionsContent()}</div>
              {/* Agrega aquí más detalles según tus necesidades */}
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default TableImmuebles
