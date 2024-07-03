import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import axiosInstance from '../utils/BackendConfig'
import './styles/AddArriendo.css'

const CustomModal = ({
  isOpen,
  onRequestClose,
  selectedRow,
  selectedOption,
  setSelectedOption
}) => {
  const handleAddImages = () => {
    setSelectedOption('addImages')
  }

  const handleEdit = () => {
    setSelectedOption('edit')
  }

  const handleDelete = () => {
    setSelectedOption('delete')
  }

  const handleService = () => {
    setSelectedOption('service')
  }

  const Service = () => {
    const [selectedOptionService, setSelectedOptionService] = useState('')

    const handleAddService = () => {
      setSelectedOptionService('addService')
    }
    const handleViewSerive = () => {
      setSelectedOptionService('viewService')
    }

    const [service, setService] = useState({
      Service: '',
      Provider: '',
      nroCuenta: '',
      FechaPago: '',
      Monto: '',
      Notas: ''
    })
    const [dataService, setDataService] = useState([])
    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('idInmueble', selectedRow.ID)
      formData.append('Service', service.Service)
      formData.append('Provider', service.Provider)
      formData.append('nroCuenta', service.nroCuenta)
      formData.append('FechaPago', service.FechaPago)
      formData.append('Monto', service.Monto)
      formData.append('Notas', service.Notas)

      try {
        const response = await axiosInstance.post('/addService', formData)
        console.log('Respuesta del servidor:', response.data)
        alert('Servicio agregado correctamente')
      } catch (error) {
        console.error('Error al agregar servicio:', error)
        alert('Hubo un error al intentar agregar el servicio')
      }
    }
    useEffect(() => {
      axiosInstance
        .get('/getServices?inmueble_id=' + selectedRow.ID)
        .then((response) => {
          setDataService(response.data.services)
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
    const handleChangeService = (e) => {
      const { name, value } = e.target

      // Verifica si el nombre del campo es "NroDia" para manejarlo específicamente
      if (name === 'FechaPago') {
        // Si el valor ingresado está vacío o es un número válido dentro del rango permitido (1 a 31)
        if (value === '' || (!isNaN(value) && value >= 1 && value <= 31)) {
          setService((prevService) => ({
            ...prevService,
            [name]: value
          }))
        }
        // Si el valor no es válido, no se actualiza el estado y se muestra un mensaje de error (opcional)
        // Puedes mostrar un mensaje de error al usuario si deseas, por ejemplo, utilizando un estado adicional
      } else {
        // Para otros campos que no sean "NroDia", simplemente actualiza el estado de "service"
        setService((prevService) => ({
          ...prevService,
          [name]: value
        }))
      }
    }
    const serviceContent = () => {
      switch (selectedOptionService) {
        case 'addService':
          return (
            <>
              <p className="text-center">Añadir Servicio</p>
              <div className="container-fluid">
                <div className="form-group">
                  <label htmlFor="">Servicio</label>
                  <input
                    className="form-control"
                    name="Service"
                    value={service.Service}
                    onChange={handleChangeService}
                    required
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Proveedor</label>
                  <input
                    className="form-control"
                    name="Provider"
                    value={service.Provider}
                    onChange={handleChangeService}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Numero de Cuenta</label>
                  <input
                    className="form-control"
                    name="nroCuenta"
                    value={service.nroCuenta}
                    onChange={handleChangeService}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Dia de Pago</label>
                  <input
                    className="form-control"
                    type="number"
                    id="FechaPago"
                    name="FechaPago"
                    value={service.FechaPago}
                    onChange={handleChangeService}
                    min={1}
                    max={31}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Monto</label>
                  <input
                    className="form-control"
                    name="Monto"
                    value={service.Monto}
                    onChange={handleChangeService}
                    type="number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    Notas (alguna información necesaria,puede ser correo,etc)
                  </label>
                  <input
                    className="form-control"
                    name="Notas"
                    value={service.Notas}
                    onChange={handleChangeService}
                    required
                    type="text"
                  />
                </div>
                <div className="container mx-auto text-center">
                  <button
                    type="submit"
                    className="btn mx-auto mt-2 btn-primary"
                    onClick={handleSubmit}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </>
          )

        case 'viewService':
          return (
            <>
              <p className="text-center">Servicios Vinculados</p>
              <div className="container">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Servicio</th>
                      <th>Proveedor</th>
                      <th>Número de Cuenta</th>
                      <th>Fecha de Pago</th>
                      <th>Monto</th>
                      <th>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataService.map((service) => (
                      <tr key={service.ID}>
                        <td>{service.ID}</td>
                        <td>{service.Servicio}</td>
                        <td>{service.Proveedor}</td>
                        <td>{service.NumeroCuenta}</td>
                        <td>{service.FechaPago}</td>
                        <td>{service.Monto}</td>
                        <td>{service.Nota}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )

        default:
          return null
      }
    }

    return (
      <>
        <p className="text-center">Servicios</p>
        <div className="container mx-auto d-flex">
          <button className="btn mx-auto" onClick={handleViewSerive}>
            Ver Servicios Vinculados
          </button>
          <button className="btn mx-auto" onClick={handleAddService}>
            Añadir Servicios
          </button>
        </div>
        <div className="mt-3">{serviceContent()}</div>{' '}
        {/* Aquí corregimos la llamada a serviceContent */}
      </>
    )
  }

  const EditInmueble = () => {
    const [direccion, setDireccion] = useState(selectedRow.Direccion)
    const [tipo, setTipo] = useState(selectedRow.Tipo)
    const [descripcion, setDescripcion] = useState(
      selectedRow.Descripcion ? selectedRow.Descripcion : ''
    )
    const [municipio, setMunicipio] = useState(selectedRow.Municipio)
    const id = selectedRow.ID
    const [error, setError] = useState('')

    const editInmueble = async () => {
      try {
        const response = await axiosInstance.put(`/editInmueble/${id}`, {
          Direccion: direccion,
          Tipo: tipo,
          Descripcion: descripcion,
          Municipio: municipio,
          CedulaPropietario: ''
        })
        console.log(response.data)
        alert('Fue actualizado correctamente')
        window.location.reload()
      } catch (err) {
        setError(err.message)
      }
    }
    return (
      <>
        <p className="text-center">Editar Inmueble</p>
        {error && <p>{error}</p>}

        <div className="form-group">
          <label htmlFor="">Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            className="form-control"
            placeholder="Descripción"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            className="form-control"
            placeholder="Tipo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Municipio</label>
          <input
            type="text"
            value={municipio}
            onChange={(event) => setMunicipio(event.target.value)}
            className="form-control"
            placeholder="Municipio"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(event) => setDireccion(event.target.value)}
            className="form-control"
            placeholder="Dirección"
          />
        </div>
        <div className="container">
          <button type="submit" className="btn mx-auto mt-2 btn-primary" onClick={editInmueble}>
            Guardar
          </button>
        </div>
      </>
    )
  }
  const AddImagen = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [description, setDescription] = useState('')

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedFile(file)
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
        alert('Fue guardada correctamente')
        setDescription('')
        setSelectedFile(null)
      } catch (error) {
        console.error('Error al subir la imagen:', error)
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
          <button className="btn btn-danger text-center mx-auto" onClick={onRequestClose}>
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
        return <EditInmueble />
      case 'delete':
        return <p>Contenido para eliminar</p>
      case 'service':
        return <Service />
      default:
        return null
    }
  }

  return (
    <Modal
      className="custom-modal modalArriendo"
      overlayClassName="custom-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ejemplo de Modal"
    >
      <div className="container-botonmodal">
        <button className="closeModal" onClick={onRequestClose}>
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
              <button className="btn btn-primary botonModalInmueble" onClick={handleService}>
                Servicios
              </button>
              <button className="btn btn-danger botonModalInmueble" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
            <div className="mt-3">{renderOptionsContent()}</div>
          </>
        )}
      </div>
    </Modal>
  )
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  selectedRow: PropTypes.object,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired
}

export default CustomModal
