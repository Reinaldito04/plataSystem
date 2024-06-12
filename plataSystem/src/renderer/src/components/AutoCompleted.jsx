import { useState, useEffect } from 'react'
import './styles/Autocomplete.css'
import PropTypes from 'prop-types'
import axiosInstance from '../utils/BackendConfig'

function Autocomplete({ onSelect }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getClients')
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
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    if (inputText.length > 0) {
      const filtered = data.filter(
        (user) =>
          user.name.toLowerCase().includes(inputText.toLowerCase()) || user.dni.includes(inputText)
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers([])
    }
  }, [inputText, data])

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSelect = (user) => {
    const selectedText = `${user.name} ${user.lastName} --- ${user.dni}`
    const selectedValue = selectedText.split('---')[1].trim() // Obtiene el valor después de "---"
    setInputText(selectedValue) // Solo establece el texto seleccionado
    setFilteredUsers([])
    if (onSelect) {
      onSelect(selectedValue)
    }
  }

  return (
    <div className="autocomplete-container">
      <label>Propietario</label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Ingrese su nombre o cédula"
        value={inputText}
        onChange={handleChange}
      />
      {filteredUsers.length > 0 && (
        <ul className="autocomplete-results">
          {filteredUsers.map((user, index) => (
            <li key={index} className="autocomplete-item" onClick={() => handleSelect(user)}>
              {user.name} {user.lastName} --- {user.dni}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
Autocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default Autocomplete
