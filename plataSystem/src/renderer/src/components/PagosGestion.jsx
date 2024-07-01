import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import ContractAutoComplect from './AutoCompletedContract'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Modal from 'react-modal'
import './styles/AddArriendo.css'

const columns = [
  {
    name: 'ID',
    selector: (row) => row.GestionCobroID,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.GestionCobroID}>
        <div>{row.GestionCobroID}</div>
      </Tippy>
    )
  },
  {
    name: 'Contrato ID',
    selector: (row) => row.ContratoID,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.ContratoID}>
        <div>{row.ContratoID}</div>
      </Tippy>
    )
  },
  {
    name: 'Concepto',
    selector: (row) => row.Concepto,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.Concepto}>
        <div>{row.Concepto}</div>
      </Tippy>
    )
  },
  {
    name: 'Fecha',
    selector: (row) => row.FechaCobro,
    sortable: true,
    cell: (row) => (
      <Tippy content={row.FechaCobro}>
        <div>{row.FechaCobro}</div>
      </Tippy>
    )
  },
  {
    name: 'Propietario',
    selector: (row) => row.PropietarioNombre,
    sortable: true,
    cell: (row) => (
      <Tippy
        content={
          <>
            {row.PropietarioNombre} {row.PropietarioApellido}
            <br />
            C.I : {row.PropietarioCedula}
          </>
        }
      >
        <div>
          {row.PropietarioNombre} {row.PropietarioApellido}
        </div>
      </Tippy>
    )
  },
  {
    name: 'Cliente',
    selector: (row) => row.ClienteNombre,
    sortable: true,
    cell: (row) => (
      <Tippy
        content={
          <div>
            <div>
              {row.ClienteNombre} {row.ClienteApellido}
            </div>

            <div> C.I : {row.CedulaCliente}</div>
          </div>
        }
      >
        <div>
          {row.ClienteNombre} {row.ClienteApellido}
        </div>
      </Tippy>
    )
  }
]

function PagosGestion() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [concept, setConcept] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [fecha, setFecha] = useState('')
  const [contrato, setContrato] = useState('')

  // States for filters
  const [filterID, setFilterID] = useState('')
  const [filterContratoID, setFilterContratoID] = useState('')
  const [filterConcepto, setFilterConcepto] = useState('')
  const [filterFecha, setFilterFecha] = useState('')
  const [filterPropietario, setFilterPropietario] = useState('')
  const [filterCliente, setFilterCliente] = useState('')

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/gestionPays')
      setData(response.data)
      setFilteredData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Filtering logic
    setFilteredData(
      data.filter((item) => {
        const fullNameCliente = `${item.ClienteNombre} ${item.ClienteApellido}`.toLowerCase()
        const fullNamePropietario =
          `${item.PropietarioNombre} ${item.PropietarioApellido}`.toLowerCase()
        return (
          (filterID ? item.GestionCobroID.toString().includes(filterID) : true) &&
          (filterContratoID ? item.ContratoID.toString().includes(filterContratoID) : true) &&
          (filterConcepto
            ? item.Concepto.toLowerCase().includes(filterConcepto.toLowerCase())
            : true) &&
          (filterFecha ? item.fechaCobro.includes(filterFecha) : true) &&
          (filterPropietario
            ? fullNamePropietario.includes(filterPropietario.toLowerCase())
            : true) &&
          (filterCliente ? fullNameCliente.includes(filterCliente.toLowerCase()) : true)
        )
      })
    )
  }, [
    filterID,
    filterContratoID,
    filterConcepto,
    filterFecha,
    filterPropietario,
    filterCliente,
    data
  ])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const handleContratoSelect = (inmueble) => {
    setContrato(inmueble)
  }

  const handlePagoSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        ContratoID: contrato?.ContratoID,
        Fecha: fecha,
        Concepto: concept
      }
      const response = await axiosInstance.post('/gestionPays', payload)
      console.log('Pago registrado exitosamente:', response.data)

      alert('almacenado correctamente')

      setModalIsOpen(false)
      setFecha('')
      setContrato(null)
      setConcept('')
      fetchData()
    } catch (error) {
      console.error('Error al registrar el pago:', error)
      alert('Error al registrar el pago')
    }
  }

  return (
    <>
      <div className="container-boton">
        <button
          onClick={() => {
            setModalIsOpen(true)
          }}
          className="btn btn-success"
        >
          Nuevo
        </button>
      </div>
      <div style={{ width: '800px', overflowX: 'auto' }}>
        {/* Filter inputs */}
        <label>Filtrar por:</label>
        <div>
          <input placeholder="ID" value={filterID} onChange={(e) => setFilterID(e.target.value)} />
          <input
            placeholder="Contrato ID"
            value={filterContratoID}
            onChange={(e) => setFilterContratoID(e.target.value)}
          />
          <input
            placeholder="Concepto"
            value={filterConcepto}
            onChange={(e) => setFilterConcepto(e.target.value)}
          />
          <input
            placeholder="Fecha"
            value={filterFecha}
            onChange={(e) => setFilterFecha(e.target.value)}
          />
          <input
            placeholder="Propietario"
            value={filterPropietario}
            onChange={(e) => setFilterPropietario(e.target.value)}
          />
          <input
            placeholder="Cliente"
            value={filterCliente}
            onChange={(e) => setFilterCliente(e.target.value)}
          />
        </div>
        <DataTable columns={columns} data={filteredData} pagination />
      </div>
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
          <h2 className="text-center">Añadir Pago</h2>
          <form onSubmit={handlePagoSubmit}>
            <div className="justify-content-center align-center mx-auto">
              <ContractAutoComplect onSelect={handleContratoSelect} />
            </div>
            <div className="form-group">
              <label htmlFor="concept">Concepto</label>
              <input
                type="text"
                className="form-control"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                id="concept"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="form-control"
                id="date"
              />
            </div>
            <div className="container-boton mt-3 mx-auto text-center">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default PagosGestion
