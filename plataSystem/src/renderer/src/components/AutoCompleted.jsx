import { useState, useEffect } from 'react'
import './styles/Autocomplete.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'

function Autocomplete({ endpoint, label, placeholder, onSelect }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoint)
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  const [inputText, setInputText] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (inputText.length > 0) {
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(inputText.toLowerCase()) ||
          item.dni?.includes(inputText)
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems([])
    }
  }, [inputText, data])

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSelect = (item) => {
    const selectedText = `${item.name || ''} ${item.lastName || ''}  --- ${item.dni || ''}`
    const selectedValue = selectedText.split('---')[1].trim() // Obtiene el valor después de "---"
    setInputText(selectedValue) // Solo establece el texto seleccionado
    setFilteredItems([])
    if (onSelect) {
      onSelect(selectedValue, item) // Pasamos el item completo
    }
  }

  return (
    <div className="autocomplete-container">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
      />
      {filteredItems.length > 0 && (
        <ul className="autocomplete-results">
          {filteredItems.map((item, index) => (
            <li key={index} className="autocomplete-item" onClick={() => handleSelect(item)}>
              {item.name} {item.lastName} --- {item.dni}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Autocomplete.propTypes = {
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Autocomplete
