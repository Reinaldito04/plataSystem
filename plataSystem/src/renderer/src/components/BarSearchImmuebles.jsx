import './styles/BarSearchImmuebles.css'
import { CiSearch } from 'react-icons/ci'
function BarSearchImmuebles() {
  return (
    <div className="sidebarImmuebles">
      <h4 className="text-center">Buscar Inmuebles</h4>
      <div className="container">
        <input className="inputBusqueda" type="text" placeholder="Buscar..." />
        <button className="btn  searchBoton text-center mx-auto">
          {' '}
          <CiSearch className="searchIcon" />{' '}
        </button>
      </div>

      <p>Descripción :</p>
      <input readOnly type="text" placeholder="Descripción..." />
      <p>Ubicación :</p>
      <input readOnly type="text" placeholder="Ubicación..." />
      <p>Tipo de inmueble :</p>
      <input readOnly type="text" placeholder="Tipo de inmueble..." />
      <p>Propietario</p>
      <input readOnly type="text" placeholder="Propietario..." />
      <p>Inquilino</p>
      <input readOnly type="text" placeholder="Inquilino..." />
      <div className="container text-center mx-auto">
        <button className="btn btn-primary text-center mx-auto">Ver Información</button>
      </div>
    </div>
  )
}

export default BarSearchImmuebles
