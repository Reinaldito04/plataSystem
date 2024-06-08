import { useState } from 'react'
import Modal from 'react-modal'
import './styles/Addclient.css'
import Autocomplete from './AutoCompleted'
function AddImmuebles() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [autocompleteValue, setAutocompleteValue] = useState('')

  const handleAutocompleteSelect = (value) => {
    setAutocompleteValue(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const notes = e.target.elements.notes.value
    console.log('Autocomplete:', autocompleteValue)
    console.log('Notas:', notes)
    // Aquí puedes hacer algo con los valores, como enviarlos a un servidor
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
            <Autocomplete onSelect={handleAutocompleteSelect} />

            <div className="form-group">
              <label>Ubicación</label>
              <input type="text" className="form-control" id="location" placeholder="Ubicación" />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <input type="text" className="form-control" id="type" placeholder="Tipo" />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notas</label>
              <textarea className="form-control" id="notes" rows="3"></textarea>
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
