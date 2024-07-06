import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'

function DeleteUser() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    axiosInstance
      .get('/getUsername')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  useEffect(() => {
    if (searchText && !selectedUser) {
      setFilteredUsers(
        data.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setFilteredUsers([])
    }
  }, [searchText, data, selectedUser])

  const handleUserSelect = (user) => {
    setSearchText(user.username)
    setSelectedUser(user)
    setFilteredUsers([])
  }

  const handleCancel = () => {
    setSearchText('')
    setSelectedUser(null)
  }

  const deleteUser = (user) => {
    axiosInstance
      .delete(`/deleteUser?ID=${user.id}`)
      .then(() => {
        setData(data.filter((u) => u.id !== user.id))
        handleCancel()
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
      })
  }

  return (
    <div>
      <p className="text-center">Eliminar Usuario</p>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario por nombre"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          disabled={selectedUser !== null}
        />
      </div>

      {filteredUsers.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleUserSelect(user)}
                style={{ cursor: 'pointer' }}
              >
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <div className="mt-2 text-center">
          <p>¿Deseas eliminar a {selectedUser.username}?</p>
          <button className="btn btn-danger" onClick={() => deleteUser(selectedUser)}>
            Eliminar
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

export default DeleteUser
