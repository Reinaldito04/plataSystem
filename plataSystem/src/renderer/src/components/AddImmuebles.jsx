import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './styles/Addclient.css'
import Autocomplete from './AutoCompleted'
import axiosInstance from '../utils/BackendConfig'

function AddImmuebles() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [autocompleteValue, setAutocompleteValue] = useState('')
  const [formData, setFormData] = useState({
    Direccion: '',
    Tipo: '',
    Municipio: '',
    Estacionamiento: ''
  })
  const [username, setUsername] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])
  const handleAutocompleteSelect = (value) => {
    setAutocompleteValue(value)
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const notes = e.target.elements.notes.value

    // Combina los datos del formulario con el valor del autocompletado
    const dataToSend = {
      ...formData,
      CedulaPropietario: autocompleteValue,
      Descripcion: notes
    }

    if (formData.Direccion == '') {
      alert('Se necesita agregar la ubicación del inmueble')
    } else if (formData.Tipo == '') {
      alert('Se necesita agregar el tipo del inmueble')
    } else if (formData.Municipio == '') {
      alert('Se necesita agregar el municipio del inmueble')
    } else if (autocompleteValue == '') {
      alert('Se necesita agregar el propietario')
    } else {
      try {
        // Envía los datos al servidor
        const response = await axiosInstance.post('/addInmueble', dataToSend)
        console.log('Respuesta del servidor:', response.data)
        // Muestra el mensaje de éxito
        const description = `Agregó el inmueble ${formData.Direccion}`
        await axiosInstance.post('/addInformation', {
          username: username,
          description: description
        })
        setAlertMessage('¡Inmueble añadido correctamente!')
        // Cierra el modal después de un tiempo
        setTimeout(() => {
          setModalIsOpen(false)
          setAlertMessage(null)
          window.location.reload()
        }, 2000)
      } catch (error) {
        console.error('Error al enviar el formulario:', error)
        // Muestra el mensaje de error
        setAlertMessage('Error al añadir el inmueble. Por favor, inténtalo de nuevo.')
      }
    }
  }

  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            setModalIsOpen(true)
          }}
          className="btn btn-primary mt-2 mx-auto"
        >
          Añadir Inmueble
        </button>
      </div>

      <Modal
        className="custom-modal"
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
        <h2>Añadir Inmueble</h2>
        <div className="container">
          <form onSubmit={handleSubmit}>
            {alertMessage && (
              <div className="alert alert-success" role="alert">
                {alertMessage}
              </div>
            )}
            <Autocomplete
              endpoint="/getClients"
              label="Propietario"
              placeholder="Ingrese su nombre o cédula"
              onSelect={handleAutocompleteSelect}
            />

            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="Direccion"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Municipio y Estado</label>
              <input
                type="text"
                className="form-control"
                id="Municipio"
                name="Municipio"
                placeholder="Municipio - Estado (en este formato)"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="Tipo"
                placeholder="Tipo"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Estacionamiento</label>
              <input
                type="text"
                className="form-control"
                id="Estacionamiento"
                name="Estacionamiento"
                placeholder="Estacionamiento"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Descripción</label>
              <textarea className="form-control" id="notes" name="notes" rows="3"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default AddImmuebles
