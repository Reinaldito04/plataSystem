import { useState, useEffect } from 'react'
import axiosInstance from '../utils/BackendConfig'

const LegalConcepts = () => {
  const [conceptos, setConceptos] = useState([])
  const [filteredConceptos, setFilteredConceptos] = useState([])
  const [nuevoConcepto, setNuevoConcepto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [filtroCasoID, setFiltroCasoID] = useState('')
  const [busquedaConcepto, setBusquedaConcepto] = useState('')
  const [casosLegales, setCasosLegales] = useState([])
  const [casoID, setCasoID] = useState('')

  const [fecha, setFecha] = useState('')
  useEffect(() => {
    fetchConceptos()
    fetchCasosLegales()
  }, [])

  const fetchConceptos = async () => {
    try {
      const response = await axiosInstance.get('/conceptos-legales')
      setConceptos(response.data)
      setFilteredConceptos(response.data)
    } catch (error) {
      console.error('Error fetching legal concepts', error)
    }
  }

  const fetchCasosLegales = async () => {
    try {
      const response = await axiosInstance.get('/casos-legales')
      setCasosLegales(response.data)
    } catch (error) {
      console.error('Error fetching legal cases', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nuevoConceptoData = {
      caso_legal_id: casoID,
      concepto: nuevoConcepto,
      descripcion: descripcion,
      fecha: fecha
    }

    try {
      const response = await axiosInstance.post('/conceptos-legales', nuevoConceptoData)
      setMensaje('Concepto legal agregado exitosamente')
      fetchConceptos()
      setNuevoConcepto('')
      setDescripcion('')
    } catch (error) {
      console.error('Error adding legal concept', error)
      setMensaje('Error adding legal concept')
    }
  }

  const handleFilterByCasoID = async (casoID) => {
    setFiltroCasoID(casoID)
    if (casoID === '') {
      setFilteredConceptos(conceptos)
    } else {
      try {
        const response = await axiosInstance.get(`/conceptos-legales?caso_legal_id=${casoID}`)
        setFilteredConceptos(response.data)
      } catch (error) {
        console.error('Error filtering legal concepts by case ID', error)
      }
    }
  }

  const handleSearchConcepto = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setBusquedaConcepto(searchTerm)
    const filtered = conceptos.filter((concepto) =>
      concepto.concepto.toLowerCase().includes(searchTerm)
    )
    setFilteredConceptos(filtered)
  }

  return (
    <div className="legal-concepts">
      <h3>Conceptos Legales</h3>
      {mensaje && <p>{mensaje}</p>}
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="filtroCasoID">Filtrar por Caso Legal:</label>
          <select
            id="filtroCasoID"
            className="form-control"
            value={filtroCasoID}
            onChange={(e) => handleFilterByCasoID(e.target.value)}
          >
            <option value="">Todos</option>
            {casosLegales.map((caso) => (
              <option key={caso.id} value={caso.id}>
                Nombre : {caso.nombre_caso}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="busquedaConcepto">Buscar Concepto:</label>
          <input
            type="text"
            id="busquedaConcepto"
            className="form-control"
            value={busquedaConcepto}
            onChange={handleSearchConcepto}
          />
        </div>
      </div>
      <ul className="list-group mb-3">
        {filteredConceptos.map((concepto) => (
          <li key={concepto.id} className="list-group-item">
            <strong>{concepto.concepto}</strong>: {concepto.descripcion} <br /> {concepto.fecha}
          </li>
        ))}
      </ul>
      <div className="separator"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Caso Legal</label>
          <select
            className="form-control"
            value={casoID}
            onChange={(e) => setCasoID(e.target.value)}
          >
            <option value="">-- Seleccione Caso Legal --</option>
            {casosLegales.map((caso) => (
              <option key={caso.id} value={caso.id}>
                {caso.nombre_caso}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nuevoConcepto">Nuevo Concepto</label>
          <input
            type="text"
            id="nuevoConcepto"
            value={nuevoConcepto}
            onChange={(e) => setNuevoConcepto(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Concepto
        </button>
      </form>
    </div>
  )
}

export default LegalConcepts
