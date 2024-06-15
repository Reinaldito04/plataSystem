import './styles/BarSearchImmuebles.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import ruta from './utils/RutaBackend'

function BarSearchImmuebles() {
  const [descripcion, setDescription] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [tipo, setTipo] = useState('')
  const [selectedInmueble, setSelectedInmueble] = useState(null)
  const [propietario, setPropietario] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [imagenData, setImagenData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleInmuebleSelect = (inmueble) => {
    setSelectedInmueble(inmueble)
  }

  const buscarInmueble = () => {
    if (selectedInmueble) {
      setDescription(selectedInmueble.Descripcion)
      setUbicacion(selectedInmueble.Direccion)
      setTipo(selectedInmueble.Tipo)
      const Propietario = `${selectedInmueble.NombrePropietario} ${selectedInmueble.ApellidoPropietario}`
      setPropietario(Propietario)
      setInquilino(selectedInmueble.NombreInquilino)
      setImagenData(selectedInmueble.Imagenes)
    }
  }

  return (
    <>
      <div className="sidebarImmuebles">
        <h4 className="text-center">Buscar Inmuebles</h4>
        <div className="container">
          <InmuebleAutocomplete onSelect={handleInmuebleSelect} />
          <button onClick={buscarInmueble}>Buscar</button>
        </div>

        <p>Descripción :</p>
        <input readOnly type="text" placeholder="Descripción..." value={descripcion} />
        <p>Ubicación :</p>
        <input readOnly type="text" placeholder="Ubicación..." value={ubicacion} />
        <p>Tipo de inmueble :</p>
        <input readOnly type="text" placeholder="Tipo de inmueble..." value={tipo} />
        <p>Propietario</p>
        <input readOnly type="text" placeholder="Propietario..." value={propietario} />
        <p>Inquilino</p>
        <input readOnly type="text" placeholder="Inquilino..." value={inquilino} />
        <div className="container-imagenes">
          <div className="contenedorimagenes" onClick={() => setModalIsOpen(true)}>
            <p className="textoImagen">{imagenData.length}</p>
            <img
              className="img-fluid"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png"
              alt=""
            />
          </div>
        </div>
        <div className="container text-center mx-auto">
          <button className="btn btn-primary text-center mx-auto">Ver Información</button>
        </div>
      </div>

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
        <div className="container-fluid">
          <p className="text-center">Imagenes</p>
          <div className="image-grid">
            {imagenData.map((imagen, idx) => (
              <div key={idx} className="image-item">
                <img
                  className="img-fluid imgInmueble"
                  src={`${ruta}/media/${imagen.Imagen}`}
                  alt={`Inmueble ${idx}`}
                />
                <p>{imagen.Descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BarSearchImmuebles
