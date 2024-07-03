import './styles/BarSearchImmuebles.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import { useState } from 'react'
import Modal from 'react-modal'
import './styles/AddArriendo.css'
import CustomModal from './ModalInmueble'

import ruta from '../utils/RutaBackend'

function BarSearchImmuebles() {
  const [descripcion, setDescription] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [tipo, setTipo] = useState('')
  const [selectedInmueble, setSelectedInmueble] = useState(null)
  const [propietario, setPropietario] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [imagenData, setImagenData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpen2, setModalIsOpen2] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedOption, setSelectedOption] = useState('') // Estado para la opción seleccionada
  const [selectedImageIndex, setSelectedImageIndex] = useState(null) // Estado para controlar la imagen seleccionada en el modal grande

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
      setInquilino(`${selectedInmueble.NombreInquilino} ${selectedInmueble.ApellidoInquilino}`)
      setImagenData(selectedInmueble.Imagenes)
    }
  }

  return (
    <>
      <div className="sidebarImmuebles">
        <h4 className="text-center">Buscar Inmuebles</h4>
        <div className="container">
          <InmuebleAutocomplete onSelect={handleInmuebleSelect} />
          <button className="btn " onClick={buscarInmueble}>
            Buscar
          </button>
        </div>

        <p>Descripción :</p>
        <input readOnly type="text" placeholder="Descripción..." value={descripcion} />
        <p>Nombre :</p>
        <input readOnly type="text" placeholder="Ubicación..." value={ubicacion} />
        <p>Tipo de inmueble :</p>
        <input readOnly type="text" placeholder="Tipo de inmueble..." value={tipo} />
        <p>Propietario</p>
        <input readOnly type="text" placeholder="Propietario..." value={propietario} />
        <p>Inquilino</p>
        <input readOnly type="text" placeholder="Inquilino..." value={inquilino} />
        <div className="container-imagenes">
          {imagenData.length > 0 && (
            <div className="contenedorimagenes" onClick={() => setModalIsOpen(true)}>
              <p className="textoImagen">{imagenData.length}</p>
              <img
                className="img-fluid"
                src={`${ruta}/media/${imagenData[0].Imagen}`} // Aquí asumo que la primera imagen será la principal
                alt={`Imagen principal`}
              />
            </div>
          )}
        </div>
        <div className="container text-center mx-auto">
          <button
            className="btn btn-primary text-center mx-auto"
            onClick={() => setModalIsOpen2(true)}
          >
            Ver Opciones
          </button>
        </div>
      </div>

      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Modal de Imágenes"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setModalIsOpen(false)}>
            X
          </button>
        </div>
        <div className="container-fluid">
          <p className="text-center">Imágenes</p>
          <div className="image-grid">
            {imagenData.map((imagen, idx) => (
              <div key={idx} className="image-item" onClick={() => setSelectedImageIndex(idx)}>
                <img
                  className="img-fluid imgInmueble"
                  src={`${ruta}/media/${imagen.Imagen}`}
                  alt={`Inmueble ${idx}`}
                />

                <p className="">Descripcion : {imagen.Descripcion}</p>
                <p
                  style={{
                    display: 'none'
                  }}
                >
                  {imagen.FechaSubida}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <CustomModal
        isOpen={modalIsOpen2}
        onRequestClose={() => setModalIsOpen2(false)}
        selectedRow={selectedInmueble}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* Modal para visualización ampliada de imágenes */}
      <Modal
        className="custom-modal modalArriendo"
        overlayClassName="custom-overlay"
        isOpen={selectedImageIndex !== null}
        onRequestClose={() => setSelectedImageIndex(null)}
        contentLabel="Modal de Imagen Ampliada"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setSelectedImageIndex(null)}>
            X
          </button>
        </div>
        <div className="container-fluid">
          <img
            className="img-fluid"
            style={{ maxHeight: '600px', maxWidth: 'auto', margin: 'auto', objectFit: 'contain' }}
            src={`${ruta}/media/${imagenData[selectedImageIndex]?.Imagen}`}
            alt={`Inmueble ${selectedImageIndex}`}
          />
          <p className="text-center fs-2">
            Descripcion : {imagenData[selectedImageIndex]?.Descripcion}
          </p>
          <p className="text-center fs-5">
            Fecha de subida : {imagenData[selectedImageIndex]?.FechaSubida.split(' ')[0]}
          </p>
        </div>
      </Modal>
    </>
  )
}

export default BarSearchImmuebles
