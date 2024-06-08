import { useState } from 'react'
import './styles/Autocomplete.css'
import PropTypes from 'prop-types'

const users = [
  { name: 'John Doe', dni: '12345678' },
  { name: 'Jane Smith', dni: '12345679' },
  { name: 'Jim Beam', dni: '12345670' },
  { name: 'Jill Valentine', dni: '12345671' },
  { name: 'Jake Muller', dni: '12345672' }
  // Añade más usuarios según sea necesario
]

function Autocomplete({ onSelect }) {
  const [inputText, setInputText] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleChange = (e) => {
    const text = e.target.value
    setInputText(text)
    if (text.length > 0) {
      const filtered = users.filter(
        (user) => user.name.toLowerCase().includes(text.toLowerCase()) || user.dni.includes(text)
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers([])
    }
  }

  const handleSelect = (user) => {
    const selectedText = `${user.name} --- ${user.dni}`
    setInputText(selectedText)
    setFilteredUsers([])
    if (onSelect) {
      onSelect(selectedText)
    }
  }

  return (
    <div className="autocomplete-container">
      <label>Dueño</label>
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
              {user.name} --- {user.dni}
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
