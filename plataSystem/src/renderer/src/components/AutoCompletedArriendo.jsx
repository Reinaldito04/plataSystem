import { useState, useEffect } from 'react'
import './styles/Autocomplete.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'

function InmuebleAutocomplete({ onSelect }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const [inputText, setInputText] = useState('')
  const [filteredInmuebles, setFilteredInmuebles] = useState([])

  useEffect(() => {
    if (inputText.length > 0) {
      const filtered = data.filter(
        (inmueble) =>
          inmueble.Direccion.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.NombrePropietario.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.ApellidoPropietario.toLowerCase().includes(inputText.toLowerCase()) ||
          inmueble.CedulaPropietario.toLowerCase().includes(inputText.toLowerCase())
      )
      setFilteredInmuebles(filtered)
    } else {
      setFilteredInmuebles([])
    }
  }, [inputText, data])

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSelect = (inmueble) => {
    const selectedText = `${inmueble.CedulaPropietario} --- ${inmueble.Direccion}`
    setInputText(selectedText)
    setFilteredInmuebles([])
    if (onSelect) {
      onSelect(inmueble)
    }
  }

  return (
    <div className="autocomplete-container form-group">
      <label>Inmueble</label>
      <input
        type="text"
        className="form-control"
        placeholder="Ingrese la dirección o el nombre del propietario"
        value={inputText}
        onChange={handleChange}
      />
      {filteredInmuebles.length > 0 && (
        <ul className="autocomplete-results">
          {filteredInmuebles.map((inmueble, index) => (
            <li key={index} className="autocomplete-item" onClick={() => handleSelect(inmueble)}>
              Nombre: {inmueble.NombrePropietario}
              <br />
              Apellido: {inmueble.ApellidoPropietario}
              <br />
              Cédula: {inmueble.CedulaPropietario}
              <br />
              Dirección: {inmueble.Direccion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

InmuebleAutocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default InmuebleAutocomplete
