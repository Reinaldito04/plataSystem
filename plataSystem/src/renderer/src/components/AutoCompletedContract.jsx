import { useState, useEffect, useRef } from 'react'
import './styles/Autocomplete.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'

function ContractAutoComplect({ onSelect, Monto }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inputText, setInputText] = useState('')
  const [filteredInmuebles, setFilteredInmuebles] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/contracts')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (inputText.length > 0) {
      const filtered = data.filter(
        (inmueble) =>
          inmueble.InmuebleDireccion.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.PropietarioNombre.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.PropietarioApellido.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.CedulaPropietario.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.ClienteNombre.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.ClienteApellido.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.InmuebleDireccion.toLowerCase().includes(inputText.toLowerCase())
      )
      setFilteredInmuebles(filtered)
    } else {
      setFilteredInmuebles([])
    }
  }, [inputText, data])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFilteredInmuebles([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSelect = (inmueble) => {
    const selectedText = `${inmueble.ContratoID}`
    setInputText(selectedText)
    setFilteredInmuebles([])
    if (onSelect) {
      onSelect(inmueble)
    }
  }

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <label>Información del contrato</label>
      <input
        type="text"
        className="form-control"
        placeholder="Ingrese la dirección o el nombre del propietario"
        value={inputText}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()} // Evita el submit del form
      />
      {filteredInmuebles.length > 0 && (
        <ul className="autocomplete-results">
          {filteredInmuebles.map((inmueble, index) => (
            <li
              key={index}
              className="autocomplete-item"
              onMouseDown={() => handleSelect(inmueble)}
            >
              <b>Propietario :</b>
              <br />
              Nombre: {inmueble.PropietarioNombre}
              <br />
              Apellido: {inmueble.PropietarioApellido}
              <br />
              Cédula: {inmueble.CedulaPropietario}
              <br />
              <b> Cliente:</b>
              <br />
              Nombre: {inmueble.ClienteNombre}
              <br />
              Apellido: {inmueble.ClienteApellido}
              <br />
              Cedula: {inmueble.CedulaCliente}
              <br />
              <b> Inmueble:</b>
              <br />
              Dirección: {inmueble.InmuebleDireccion}
              <br />
              ID Contrato : {inmueble.ContratoID}
              {/* Renderizar Monto si existe */}
              {Monto == 'si' && (
                <div>
                  <b>Monto:</b> {inmueble.Monto}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

ContractAutoComplect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  Monto: PropTypes.string
}

export default ContractAutoComplect
