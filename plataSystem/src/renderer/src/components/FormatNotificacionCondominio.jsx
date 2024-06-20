import { useState, useEffect } from 'react'
import ContractAutoComplect from './AutoCompletedContract'
import axiosInstance from '../utils/BackendConfig'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ruta from '../utils/RutaBackend'
function FormatNotificacionCondominio() {
  const [data, setData] = useState({})

  const numberToWords = (num) => {
    const daysInWords = [
      'Uno',
      'Dos',
      'Tres',
      'Cuatro',
      'Cinco',
      'Seis',
      'Siete',
      'Ocho',
      'Nueve',
      'Diez',
      'Once',
      'Doce',
      'Trece',
      'Catorce',
      'Quince',
      'Dieciséis',
      'Diecisiete',
      'Dieciocho',
      'Diecinueve',
      'Veinte',
      'Veintiuno',
      'Veintidós',
      'Veintitrés',
      'Veinticuatro',
      'Veinticinco',
      'Veintiséis',
      'Veintisiete',
      'Veintiocho',
      'Veintinueve',
      'Treinta',
      'Treinta y uno'
    ]

    return daysInWords[num - 1]
  }
  const formatSpanishDate = (date) => {
    const day = date.getDate()
    const month = format(date, 'MMMM', { locale: es })
    const year = date.getFullYear()

    const dayInWords = numberToWords(day)
    const dayFormatted = `${dayInWords.charAt(0).toUpperCase() + dayInWords.slice(1)} (${day.toString().padStart(2, '0')})`

    return `${dayFormatted} de ${month} ${year}`
  }
  const [formdata, setFormData] = useState({
    condominio: '',
    fecha: '', // añadimos este campo
    nombre: '',
    cedula: '',
    inmueble: '',
    telefono: '',
    mes: '',
    year: '',
    mudanzaday: '',
    mudanzames: ''
  })

  const handleContratoSelect = (inmueble) => {
    setData(inmueble)
  }

  useEffect(() => {
    if (data) {
      const currentDate = new Date()
      const formattedDate = formatSpanishDate(currentDate)
      setFormData((prevFormData) => ({
        ...prevFormData,
        condominio: data.Condominio || '', // Asegúrate de que este campo sea correcto
        inmueble: data.InmuebleDireccion || '',
        telefono: data.Telefono || '',
        cedula: data.CedulaCliente || '',
        nombre: `${data.ClienteNombre} ${data.ClienteApellido}`,
        fecha: formattedDate, // fecha actual en formato YYYY-MM-DD
        mes: '', // aseguramos que este campo exista
        year: '', // aseguramos que este campo exista
        mudanzaday: '', // aseguramos que este campo exista
        mudanzames: '' // aseguramos que este campo exista
      }))
    }
  }, [data])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formdata) // aseguramos que mostramos formdata en el log

    try {
      await axiosInstance.post('/generate-notificacionInquilino', formdata).then((response) => {
        console.log(response)

        const downloadUrl = `${ruta}/${response.data.file_path}`
        const dowloandLink = document.createElement('a')
        dowloandLink.href = downloadUrl
        dowloandLink.setAttribute('download', '')
        document.body.appendChild(dowloandLink)
        dowloandLink.click()
        document.body.removeChild(dowloandLink)
      })
      console.log('el formato generado exitosamente')
    } catch (error) {
      console.log('Error al generar el formato')
    }
  }

  return (
    <div className="container-fluid">
      <p className="text-center">Generar Documento para notificaciones de Condominio</p>
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <ContractAutoComplect onSelect={handleContratoSelect} />
          </div>
          <div className="form-group">
            <label htmlFor="condominio">Condominio</label>
            <input
              type="text"
              className="form-control"
              id="condominio"
              value={formdata.condominio}
              onChange={handleChange}
              placeholder="Condominio"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mes">Mes inicio del condominio</label>
            <input
              type="text"
              className="form-control"
              id="mes"
              value={formdata.mes}
              onChange={handleChange}
              placeholder="Mes inicio Ej:Enero"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Año inicio del condominio</label>
            <input
              type="text"
              className="form-control"
              id="year"
              value={formdata.year}
              onChange={handleChange}
              placeholder="Año inicio Ej:2024"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mudanzaday">Día para empezar la mudanza</label>
            <input
              type="text"
              className="form-control"
              id="mudanzaday"
              value={formdata.mudanzaday}
              onChange={handleChange}
              placeholder="Día para empezar la mudanza"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mudanzames">Mes para empezar la mudanza</label>
            <input
              type="text"
              className="form-control"
              id="mudanzames"
              value={formdata.mudanzames}
              onChange={handleChange}
              placeholder="Mes para empezar la mudanza"
            />
          </div>
          <div className="text-center mt-2">
            <button type="submit" className="btn btn-success text-center">
              Generar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormatNotificacionCondominio
