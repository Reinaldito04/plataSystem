import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import ruta from '../utils/RutaBackend'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RenovarContrato from './RenovarContrato'
const columns = (
  handlePrint,
  handleCancel,
  handleModal,
  tipoUser,
  openModal2,
  desactivarContrato
) => [
  {
    name: 'ID del Contrato',
    selector: (row) => row.ContratoID,
    sortable: true,
    filterable: true
  },
  {
    name: 'Alquilado Por',
    selector: (row) => row.CedulaCliente,
    sortable: true,
    filterable: true, // Habilita el filtro para esta columna
    cell: (row) => (
      <Tippy
        content={
          <>
            Cedula : {row.CedulaCliente} <br />
            Telefono : {row.Telefono} <br />
          </>
        }
      >
        <div>{`${row.ClienteNombre} ${row.ClienteApellido}`}</div>
      </Tippy>
    )
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido}`,
    sortable: true,
    filterable: true,
    cell: (row) => (
      <Tippy
        content={
          <>
            Cedula : {row.CedulaPropietario} <br />
          </>
        }
      >
        <div>{`${row.PropietarioNombre} ${row.PropietarioApellido}`}</div>
      </Tippy>
    )

    // Habilita el filtro para esta columna
  },
  {
    name: 'Direccion',
    selector: (row) => row.InmuebleDireccion,
    sortable: true,
    filterable: true, // Habilita el filtro para esta columna
    cell: (row) => (
      <Tippy
        content={
          <>
            Municipio : {row.Municipio} <br />
          </>
        }
      >
        <div>{row.InmuebleDireccion}</div>
      </Tippy>
    )
  },
  {
    name: 'Desde',
    selector: (row) => row.FechaInicio,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Hasta',
    selector: (row) => row.FechaFin,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Monto',
    selector: (row) => `${row.Monto}$`,
    sortable: true,
    filterable: true
  },
  {
    name: 'Acciones',
    cell: (row) => (
      <div>
        <button className="btn btn-primary mt-1" onClick={() => handlePrint(row)}>
          Imprimir
        </button>
        <button className="btn btn-success mt-1" onClick={() => handleModal(row)}>
          Detalles
        </button>
        <button className="btn btn-primary mt-1" onClick={() => openModal2(row)}>
          Renovar
        </button>
        {desactivarContrato && (
          <button className="btn btn-danger mt-1" onClick={() => desactivarContrato(row)}>
            Inactivar
          </button>
        )}
        {tipoUser === 'admin' && (
          <button className="btn btn-danger mt-1" onClick={() => handleCancel(row)}>
            Cancelar
          </button>
        )}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
]
const customStyles = {
  header: {
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: 'Helvetica, Arial, sans-serif',
      textAlign: 'center',
      padding: '10px',
      borderTop: '2px solid #ddd',
      borderBottom: '2px solid #ddd',
      color: '#333',
      backgroundColor: '#F1F1F1'
    }
  },
  rows: {
    style: {
      minHeight: '60px', // Cambiar altura de filas
      fontSize: '12px',
      borderBottom: '1px solid #e3e3e3'
    }
  },
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: '#f7f7f7',
      borderBottom: '2px solid #ddd',
      color: '#333'
    }
  },
  cells: {
    style: {
      padding: '10px' // Espaciado en las celdas
    }
  }
}
function TableArriendos() {
  const [filterText, setFilterText] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpen2, setModalIsOpen2] = useState(false)

  const [detailsContrat, setDetailsContrat] = useState([])
  const [activeButton, setActiveButton] = useState('')
  const [detailsInmueble, setDetailsInmueble] = useState({
    acontecimiento: '',
    fecha: ''
  })
  const [username, setUsername] = useState('')
  const [tipoUser, setTipoUser] = useState('')
  useEffect(() => {
    setTipoUser(localStorage.getItem('userType'))
  })
  const [detailsFromBackend, setDetailsFromBackend] = useState([])
  const [payFromBackend, setPayFromBackend] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredPays = payFromBackend.filter(
    (pago) =>
      pago.TipoPago.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.Fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.Monto.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
  useEffect(() => {
    axiosInstance
      .get('/contracts')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])
  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])
  const MySwal = withReactContent(Swal)
  useEffect(() => {
    if (!modalIsOpen) {
      // Reinicia los detalles del inmueble cuando el modal se cierre
      setDetailsInmueble({
        acontecimiento: '',
        fecha: ''
      })
      setDetailsContrat([])
      setDetailsFromBackend([])
      setPayFromBackend([])
      setSearchTerm('')
      setFilterText('')

      // Reinicia el estado de activeButton cuando el modal se cierra

      setActiveButton('')
    }
  }, [modalIsOpen])

  useEffect(() => {
    if (activeButton === 'ViewAcont') {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(
            `/GetAcontecimiento/${detailsContrat.ContratoID}`
          ) // Reemplaza con la URL de tu API
          setDetailsFromBackend(response.data)
          console.log(detailsFromBackend)
        } catch (error) {
          console.error('Error al obtener los datos:', error)
        }
      }
      fetchData()
    }
    if (activeButton === 'ViewResum') {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/report-pays/${detailsContrat.ContratoID}`) // Reemplaza con la URL de tu API
          setDetailsFromBackend(response.data)
          console.log(detailsFromBackend)
        } catch (error) {
          console.error('Error al obtener los datos:', error)
        }
      }
      fetchData()
    }
    if (activeButton === 'viewPays') {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/getPays/${detailsContrat.ContratoID}`) // Reemplaza con la URL de tu API
          setPayFromBackend(response.data)
          console.log(detailsFromBackend)
        } catch (error) {
          console.error('Error al obtener los datos:', error)
        }
      }
      fetchData()
    }
  }, [activeButton])

  const desactivarContrato = async (row) => {
    MySwal.fire({
      title: '¿Estas seguro de desactivar este contrato?',
      text: 'No se eliminara información vinculada a este contrato',
      icon: 'warning',

      showCancelButton: true,
      cancelButtonText: 'No, no desactivar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.put(`/contract-desactivar/${row.ContratoID}`).then((response) => {
          console.log(response.data)
          MySwal.fire({
            title: 'Contrato desactivado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        location.reload().catch((error) => {
          console.error('Error al desactivar el contrato:', error)
          alert('Hubo un error al desactivar el contrato. Inténtalo de nuevo más tarde.')
        })
      }
    })
  }
  const handlePrint = (row) => {
    const reportData = {
      fecha: new Date().toISOString().split('T')[0], // fecha actual en formato YYYY-MM-DD
      nombre: `${row.PropietarioNombre} ${row.PropietarioApellido}`,
      inmueble: row.InmuebleDireccion,
      municipio: row.Municipio,
      motivo: 'RENOVACION DEL CONTRATO DE ARRENDAMIENTO',
      fechaInicio: row.FechaInicio,
      fechaFin: row.FechaFin,
      duracionMeses: row.DuracionMeses,
      monto: row.Monto
    }

    axiosInstance
      .post('/generate-contratReport', reportData)
      .then((response) => {
        console.log('Reporte generado exitosamente:', response.data)

        const downloadUrl = `${ruta}/${response.data.file_path}`

        // Crear un elemento <a> para iniciar la descarga
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadUrl
        downloadLink.setAttribute('download', '')
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error generando reporte:', error.response.data)
          setError('Error al generar el reporte: ' + error.response.data.detail)
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request)
          setError('Error al comunicarse con el servidor')
        } else {
          console.error('Error inesperado:', error.message)
          setError('Error inesperado: ' + error.message)
        }
      })
  }
  const handleSubmitDetails = async () => {
    if (detailsInmueble.acontecimiento === '') {
      alert('Acontecimiento no puede estar vacío')
      return
    }
    if (detailsInmueble.fecha === '') {
      alert('Fecha no puede estar vacía')
      return
    }
    try {
      const response = await axiosInstance.post('/AddAcontecimiento', {
        ContratoID: detailsContrat.ContratoID,
        Detalle: detailsInmueble.acontecimiento,
        Fecha: detailsInmueble.fecha
      })
      await axiosInstance.post('/addInformation', {
        username: username,
        description: `Se agrego el acontecimiento ${detailsInmueble.acontecimiento} al contrato ${detailsContrat.ContratoID}`
      })
      console.log(response.data)
      // Puedes manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito o cerrar el modal
      setModalIsOpen(false)
    } catch (error) {
      console.error('Error al enviar los detalles:', error)
      alert('Hubo un error al enviar los detalles. Inténtalo de nuevo más tarde.')
    }
  }
  const handleCancel = async (row) => {
    MySwal.fire({
      title: '¿Estás seguro de cancelar este contrato?',
      text: 'Se eliminara toda información de este contrato (incluido pagos)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, no cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/contract/${row.ContratoID}`).then((response) => {
          console.log(response.data)
          MySwal.fire({
            title: 'Contrato cancelado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        axiosInstance
          .post('/addInformation', {
            username: username,
            description: `Se elimino el contrato de la cedula del identidad : ${row.CedulaPropietario} (${row.InmuebleDireccion})`
          })
          .catch((error) => {
            console.error('Error al cancelar el contrato:', error)
            alert('Hubo un error al cancelar el contrato. Inténtalo de nuevo más tarde.')
          })
      }
    })
  }

  const handleReportSubmit = async () => {
    try {
      const IdContract = detailsContrat.ContratoID // Suponiendo que contrato es tu objeto con el ID de contrato
      await axiosInstance.post(`/report-pays/${IdContract}`).then((response) => {
        console.log(response)

        // Construir la URL de descarga del archivo
        const downloadUrl = `${ruta}/${response.data.file_path}`
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadUrl
        downloadLink.setAttribute('download', '')
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      })
      console.log('El formato generado exitosamente')
    } catch (error) {
      console.log('Error al generar el formato:', error)
    }
  }

  const renderOptionsContent = () => {
    switch (activeButton) {
      case 'addAcont':
        return (
          <>
            <p className="text-center">Añadir Acontecimientos al contrato</p>
            <div className="form-group">
              <label htmlFor="">Acontecimiento</label>
              <input
                type="text"
                className="form-control"
                placeholder="Acontecimiento..."
                required
                id="acont"
                value={detailsInmueble.acontecimiento} // Asigna el valor del estado al input
                name="acont"
                onChange={(e) =>
                  setDetailsInmueble((prevFormData) => ({
                    ...prevFormData,
                    acontecimiento: e.target.value // Actualiza solo la propiedad 'acontecimiento'
                  }))
                } // Maneja el evento onChange
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Fecha</label>
              <input
                type="date"
                value={detailsContrat.fecha}
                onChange={(e) =>
                  setDetailsInmueble((prevFormData) => ({
                    ...prevFormData,
                    fecha: e.target.value
                  }))
                }
                className="form-control"
                placeholder="Fecha..."
                required
              />
            </div>
            <div className="text-center mt-2">
              <button onClick={handleSubmitDetails} className="btn btn-success text-center mx-auto">
                Añadir
              </button>
            </div>
          </>
        )
      case 'viewPays':
        return (
          <>
            <p className="text-center ">Pagos vinculados al contrato</p>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tipo de pago</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Metodo de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPays.map((pago, index) => (
                    <tr key={index}>
                      <td>{pago.TipoPago}</td>
                      <td>{pago.Fecha}</td>
                      <td>{pago.Monto}$</td>
                      <td>{pago.Metodo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mx-auto text-center">
                <button
                  onClick={() => handleReportSubmit()}
                  className="btn btn-primary text-center"
                >
                  Imprimir canon
                </button>
              </div>
            </div>
          </>
        )
      case 'ViewResum':
        return (
          <>
            <p className="text-center">Resumen del contrato</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Inquilino</td>
                    <td>{detailsFromBackend.INQUILINO}</td>
                  </tr>
                  <tr>
                    <td>Contacto</td>
                    <td>{detailsFromBackend.N_CONTACTO}</td>
                  </tr>
                  <tr>
                    <td>Correo</td>
                    <td>{detailsFromBackend.CORREO}</td>
                  </tr>
                  <tr>
                    <td>Inmueble</td>
                    <td>{detailsFromBackend.INMUEBLE}</td>
                  </tr>
                  <tr>
                    <td>Fecha de Contrato</td>
                    <td>{detailsFromBackend.FECHA_CONTRATO}</td>
                  </tr>
                  <tr>
                    <td>Canon</td>
                    <td>{detailsFromBackend.CANON}</td>
                  </tr>
                  <tr>
                    <td>Depósito en Garantía</td>
                    <td>{detailsFromBackend.DEPOSITO_EN_GARANTIA}</td>
                  </tr>

                  {/* Canones Mensuales */}
                  <tr>
                    <td>Canones Mensuales</td>
                    <td>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Mes</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(detailsFromBackend.CANONES_MENSUALES) ? (
                            detailsFromBackend.CANONES_MENSUALES.map((canon, index) => (
                              <tr key={index}>
                                <td>{canon['CANON MES']}</td>
                                <td>{canon.Cantidad}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2">No hay canones mensuales disponibles</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>Total Contrato</td>
                    <td>{detailsFromBackend.TOTAL_CONTRATO}</td>
                  </tr>

                  {/* Depósitos Efectuados */}
                  <tr>
                    <td>Depósitos Efectuados</td>
                    <td>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Modalidad</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(detailsFromBackend.DEPOSITOS_EFECTUADOS) ? (
                            detailsFromBackend.DEPOSITOS_EFECTUADOS.map((deposito, index) => (
                              <tr key={index}>
                                <td>{deposito.Fecha}</td>
                                <td>{deposito.MODALIDAD}</td>
                                <td>{deposito.Cantidad}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No hay depósitos efectuados</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>Total Depositado</td>
                    <td>{detailsFromBackend.TOTAL_DEPOSITADO}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      case 'ViewAcont':
        return (
          <>
            <p className="text-center ">Acontecimientos vinculados al contrato</p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Acontecimiento</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsFromBackend.map((acontecimiento, index) => (
                    <tr key={index}>
                      <td>{acontecimiento.Detalle}</td>
                      <td>{acontecimiento.Fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
    }
  }
  const handleButtonClick = (content) => {
    setActiveButton(content)
  }
  const handleModal = (row) => {
    setModalIsOpen(true)
    setDetailsContrat(row)
  }

  const [selectedRow, setSelectedRow] = useState([])

  const openModal2 = (row) => {
    setSelectedRow(row)
    setModalIsOpen2(true)
  }

  const closeModal2 = () => {
    setModalIsOpen2(false)
    setSelectedRow(null)
  }

  const filteredItems = data.filter((item) => {
    const fullNameCliente = `${item.ClienteNombre} ${item.ClienteApellido}`.toLowerCase()
    const fullNamePropietario =
      `${item.PropietarioNombre} ${item.PropietarioApellido}`.toLowerCase()
    return (
      fullNameCliente.includes(filterText.toLowerCase()) ||
      fullNamePropietario.includes(filterText.toLowerCase()) ||
      item.InmuebleDireccion?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaInicio?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaFin?.toLowerCase().includes(filterText.toLowerCase())
    )
  })

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <DataTable
        title="Lista de Contratos"
        columns={columns(
          handlePrint,
          handleCancel,
          handleModal,
          tipoUser,
          openModal2,
          desactivarContrato
        )}
        data={filteredItems}
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles} // Aplicar estilos personalizados
        responsive
        striped // Alterna colores de fila
        noHeader={false} // Mostrar encabezado de la tabla
      />

      <Modal
        className="custom-modal modalArriendo"
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
          <h2 className="text-center">Detalles</h2>
          <div className="container-fluid mx-auto text-center">
            <button
              className="btn btn-dark mx-auto"
              onClick={() => {
                handleButtonClick('viewPays')
              }}
            >
              Ver Pagos
            </button>
            <button
              className="btn btn-primary mx-auto"
              onClick={() => {
                handleButtonClick('ViewAcont')
              }}
            >
              Ver Acontecimientos
            </button>
            <button
              className="btn btn-info mx-auto"
              onClick={() => {
                handleButtonClick('ViewResum')
              }}
            >
              Resumen
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleButtonClick('addAcont')
              }}
            >
              Añadir Acontecimiento
            </button>
          </div>
          <div className="mt-3">{renderOptionsContent()}</div>
        </div>
      </Modal>

      <RenovarContrato Contrato={selectedRow} isOpen={modalIsOpen2} onRequestClose={closeModal2} />
    </>
  )
}

export default TableArriendos
