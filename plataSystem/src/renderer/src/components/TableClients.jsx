import Modal from 'react-modal'
import './styles/Addclient.css'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import ruta from '../utils/RutaBackend'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function TableClients() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalCedulaIsOpen, setModalCedulaIsOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [imagen, setImagen] = useState(null)
  const [username, setUsername] = useState('')
  const [filterText, setFilterText] = useState('')

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.dni.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase())
  )
  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])
  const handleClickEdit = (row) => {
    setModalIsOpen(true)
    setDataEdit(row)
  }
  const MySwal = withReactContent(Swal)

  const handleClickEditCed = (row) => {
    setModalCedulaIsOpen(true)
    setDataEdit(row)
  }
  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', imagen)
      formData.append('id', dataEdit.id)

      const response = await axiosInstance.post('/addImagenCedula', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Respuesta del servidor:', response.data)
      alert('Se ha guardado correctamente')
      setImagen(null)
      // Aquí deberías cerrar el modal o hacer cualquier otra acción necesaria
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  }
  const handleClickEditPut = async (ID) => {
    try {
      const response = await axiosInstance.put(`/editClient/${ID}`, {
        name: dataEdit.name,
        lastName: dataEdit.lastName,
        dni: dataEdit.dni,
        rif: dataEdit.rif,
        email: dataEdit.email,
        birthdate: dataEdit.birthdate,
        phone: dataEdit.phone,
        address: dataEdit.address,
        CodePostal: dataEdit.codePostal
      })
      alert('Se actualizo correctamente')
      window.location.reload()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  const handleCancel = async (row) => {
    MySwal.fire({
      title: '¿Estás seguro de eliminar este cliente?',
      text: 'Se eliminara toda información del cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, no cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/deleteClient/${row.id}`).then((response) => {
          console.log(response.data)
          MySwal.fire({
            title: 'Cliente eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        axiosInstance
          .post('/addInformation', {
            username: username,
            description: `Se elimino el cliente ${row.name} ${row.lastName} `
          })
          .catch((error) => {
            console.error('Error al cancelar el contrato:', error)
            alert('Hubo un error. Inténtalo de nuevo más tarde.')
          })
      }
    })
  }

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

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      name: 'Imagen Cedula',
      selector: (row) => row.imagenCedula,
      sortable: true,
      cell: (row) => {
        if (row.imagenCedula === 'No tiene imagen') {
          return (
            <div className="container">
              <button className="btn text-muted fs-6" onClick={() => handleClickEditCed(row)}>
                Añadir{' '}
              </button>
            </div>
          )
        } else {
          // Aquí podrías retornar otra imagen o manejar la visualización de la imagen real si existe
          return (
            <div>
              <img
                src={`${ruta}/media/${row.imagenCedula}`}
                width="50px"
                height="50px"
                alt="Imagen de cédula"
              ></img>
              <button
                onClick={() => {
                  const url = `${ruta}/media/${row.imagenCedula}`
                  const newWindow = window.open(url, '_blank')
                  newWindow.focus()
                }}
              >
                Descargar
              </button>
            </div>
          )
        }
      }
    },
    { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Nombre', selector: (row) => row.name, sortable: true },
    { name: 'Apellido', selector: (row) => row.lastName, sortable: true },
    { name: 'DNI', selector: (row) => row.dni, sortable: true },
    { name: 'RIF', selector: (row) => row.rif, sortable: true },
    { name: 'Fecha de Nacimiento', selector: (row) => row.birthdate, sortable: true },
    { name: 'Dirección', selector: (row) => row.address, sortable: true },
    { name: 'Teléfono', selector: (row) => row.phone, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Codigo Postal', selector: (row) => row.codePostal, sortable: true },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <button className="btn btn-primary" onClick={() => handleClickEdit(row)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => handleCancel(row)}>
            Borrar
          </button>
        </div>
      )
    }
  ]

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div style={{ width: '800px', overflowX: 'auto' }}>
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control mb-2"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="btn btn-secondary mb-2" onClick={fetchData}>
          Recargar Tabla
        </button>
        <DataTable columns={columns} data={filteredData} pagination />
      </div>
      <Modal
        className="custom-modal"
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
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="text-center">Editar</h2>
          </div>
          <div className="contenedor">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                value={dataEdit.name}
                onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                value={dataEdit.lastName}
                onChange={(e) => setDataEdit({ ...dataEdit, lastName: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                value={dataEdit.dni}
                onChange={(e) => setDataEdit({ ...dataEdit, dni: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rif">RIF</label>
              <input
                type="text"
                value={dataEdit.rif}
                onChange={(e) => setDataEdit({ ...dataEdit, rif: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Fecha de Nacimiento</label>
              <input
                type="date"
                value={dataEdit.birthdate}
                onChange={(e) => setDataEdit({ ...dataEdit, birthdate: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                value={dataEdit.address}
                onChange={(e) => setDataEdit({ ...dataEdit, address: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                value={dataEdit.phone}
                onChange={(e) => setDataEdit({ ...dataEdit, phone: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={dataEdit.email}
                onChange={(e) => setDataEdit({ ...dataEdit, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="codePostal">Codigo Postal</label>
              <input
                type="text"
                value={dataEdit.codePostal}
                onChange={(e) => setDataEdit({ ...dataEdit, codePostal: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="container mx-auto">
            <button className="btn btn-primary" onClick={() => handleClickEditPut(dataEdit.id)}>
              Guardar
            </button>
            <button className="btn btn-primary" onClick={() => setModalIsOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        className="custom-modal"
        overlayClassName="custom-overlay"
        isOpen={modalCedulaIsOpen}
        onRequestClose={() => setModalCedulaIsOpen(false)}
        contentLabel="Ejemplo de Modal"
      >
        <div className="container-botonmodal">
          <button className="closeModal" onClick={() => setModalCedulaIsOpen(false)}>
            X
          </button>
        </div>
        <div className="container-fluid">
          <h2 className="text-center">Añadir Cedula</h2>
          <div className="form-group">
            <label htmlFor="">Nombre y Apellido</label>
            <input
              type="text"
              className="form-control"
              value={`${dataEdit.name} ${dataEdit.lastName} `}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Cedula</label>
            <input
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
              className="form-control"
            />
          </div>

          <div className="container mx-auto text-center">
            <button
              type="submit"
              className="btn mx-auto mt-2 btn-primary"
              onClick={() => {
                handleUpload()
                setModalCedulaIsOpen(false)
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TableClients
