import  { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContractAutoComplect from './AutoCompletedContract'
import ruta from '../utils/RutaBackend'
import axiosInstance from '../utils/BackendConfig'

function FormatNotificacionVehiculos() {
  const initialState = {
    fechaInicio: '',
    inquilinos: [{ nombre: '', cedula: '' }],
    inmueble: '',
    vehiculos: [{ modelo: '', placa: '', color: '' }],
    telefonos: [''],
    ubicacion: '',
    condominio: ''
  }

  const [formState, setFormState] = useState(initialState)

  const handleInquilinoChange = (index, event) => {
    const values = [...formState.inquilinos]
    values[index][event.target.name] = event.target.value
    setFormState({ ...formState, inquilinos: values })
  }

  const handleVehiculoChange = (index, event) => {
    const values = [...formState.vehiculos]
    values[index][event.target.name] = event.target.value
    setFormState({ ...formState, vehiculos: values })
  }

  const handleRemoveInquilino = (index) => {
    const values = [...formState.inquilinos]
    values.splice(index, 1)
    setFormState({ ...formState, inquilinos: values })
  }

  const handleTelefonoChange = (index, event) => {
    const values = [...formState.telefonos]
    values[index] = event.target.value
    setFormState({ ...formState, telefonos: values })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const inquilinosFiltrados = formState.inquilinos.filter(
      (inquilino) => inquilino.nombre.trim() !== '' && inquilino.cedula.trim() !== ''
    )
    const telefonosFiltrados = formState.telefonos.filter((telefono) => telefono.trim() !== '')
    const vehiculosFiltrados = formState.vehiculos.filter(
      (vehiculo) =>
        vehiculo.modelo.trim() !== '' &&
        vehiculo.placa.trim() !== '' &&
        vehiculo.color.trim() !== ''
    )
    const data = {
      fecha_inicio: formState.fechaInicio,
      inquilinos: inquilinosFiltrados,
      inmueble: formState.inmueble,
      vehiculos: vehiculosFiltrados,
      telefonos: telefonosFiltrados,
      ubicacion: formState.ubicacion,
      condominio: formState.condominio,
      fechaActual: new Date().toISOString().split('T')[0]
    }
    try {
      console.log(data)
      const response = await axiosInstance
        .post('/generate-notificacionVehicular', data)
        .then((response) => {
          console.log(response)
          const downloadUrl = `${ruta}/${response.data.file_path}`
          const dowloandLink = document.createElement('a')
          dowloandLink.href = downloadUrl
          dowloandLink.setAttribute('download', '')
          document.body.appendChild(dowloandLink)
          dowloandLink.click()
          document.body.removeChild(dowloandLink)
        })
      console.log('Reporte generado:', response.data)
    } catch (error) {
      console.error('Error al generar el reporte:', error)
    }
  }

  const handleContratoSelect = (inmueble) => {
    setFormState((prevState) => ({
      ...prevState,
      inmueble: inmueble.InmuebleDireccion,
      ubicacion: inmueble.Municipio
    }))
  }

  const handleClear = () => {
    setFormState(initialState)
  }

  return (
    <div className="container- mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">Generar Notificación de Vehículos</h2>
        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            className="form-control"
            value={formState.fechaInicio}
            onChange={(e) => setFormState({ ...formState, fechaInicio: e.target.value })}
          />
        </div>
        <div className="form-group">
          <ContractAutoComplect onSelect={handleContratoSelect} />
          <label>Inmueble:</label>
          <input
            type="text"
            className="form-control"
            value={formState.inmueble}
            onChange={(e) => setFormState({ ...formState, inmueble: e.target.value })}
          />
          <label htmlFor="Ubicacion">Ubicacion : </label>
          <input
            type="text"
            className="form-control"
            value={formState.ubicacion}
            onChange={(e) => setFormState({ ...formState, ubicacion: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="condominio">Condominio:</label>
          <input
            type="text"
            className="form-control"
            value={formState.condominio}
            onChange={(e) => setFormState({ ...formState, condominio: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Inquilinos:</label>
          {formState.inquilinos.map((inquilino, index) => (
            <div key={index} className="form-row mb-2">
              <div className="col">
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={inquilino.nombre}
                  onChange={(event) => handleInquilinoChange(index, event)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="cedula"
                  className="form-control"
                  placeholder="Cédula"
                  value={inquilino.cedula}
                  onChange={(event) => handleInquilinoChange(index, event)}
                />
              </div>
              {formState.inquilinos.length > 1 && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveInquilino(index)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
              {index === formState.inquilinos.length - 1 && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        inquilinos: [...formState.inquilinos, { nombre: '', cedula: '' }]
                      })
                    }
                  >
                    Agregar Inquilino
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Vehículos:</label>
          {formState.vehiculos.map((vehiculo, index) => (
            <div key={index} className="form-row mb-2">
              <div className="col">
                <input
                  type="text"
                  name="modelo"
                  className="form-control"
                  placeholder="Modelo"
                  value={vehiculo.modelo}
                  onChange={(event) => handleVehiculoChange(index, event)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="placa"
                  className="form-control"
                  placeholder="Placa"
                  value={vehiculo.placa}
                  onChange={(event) => handleVehiculoChange(index, event)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="color"
                  className="form-control"
                  placeholder="Color"
                  value={vehiculo.color}
                  onChange={(event) => handleVehiculoChange(index, event)}
                />
              </div>
              {index === formState.vehiculos.length - 1 && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        vehiculos: [...formState.vehiculos, { modelo: '', placa: '', color: '' }]
                      })
                    }
                  >
                    Agregar Vehículo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Teléfonos:</label>
          {formState.telefonos.map((telefono, index) => (
            <div key={index} className="form-row mb-2">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(event) => handleTelefonoChange(index, event)}
                />
              </div>
              {index === formState.telefonos.length - 1 && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setFormState({ ...formState, telefonos: [...formState.telefonos, ''] })
                    }
                  >
                    Agregar Teléfono
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-2">
            Generar Reporte
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormatNotificacionVehiculos
