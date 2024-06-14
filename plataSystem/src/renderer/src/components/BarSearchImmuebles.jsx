import './styles/BarSearchImmuebles.css'
import InmuebleAutocomplete from './AutoCompletedArriendo'
import axiosInstance from '../utils/BackendConfig'
import { useState, useEffect } from 'react'

function BarSearchImmuebles() {
  const [descripcion, setDescription] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [tipo, setTipo] = useState('')
  const [selectedInmueble, setSelectedInmueble] = useState('')
  const [propietario, setPropietario] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [imagenData, setImagenData] = useState([])

  const handleInmuebleSelect = (inmueble) => {
    setSelectedInmueble(inmueble)
  }
  const buscarInmueble = () => {
    console.log(selectedInmueble)
    setDescription(selectedInmueble.Descripcion)
    setUbicacion(selectedInmueble.Direccion)
    setTipo(selectedInmueble.Tipo)
    const Propietario = `${selectedInmueble.NombrePropietario} ${selectedInmueble.ApellidoPropietario}`
    setPropietario(Propietario)
    setInquilino(selectedInmueble.NombreInquilino)
    setImagenData(selectedInmueble.Imagenes)
  }
  return (
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
        <p>Imagenes</p>
        <div className="contenedorimagenes">
          <p className="textoImagen">{imagenData.length}</p>
        </div>
      </div>
      <div className="container text-center mx-auto">
        <button className="btn btn-primary text-center mx-auto">Ver Información</button>
      </div>
    </div>
  )
}

export default BarSearchImmuebles
