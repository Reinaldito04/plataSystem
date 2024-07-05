import { useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import ruta from '../utils/RutaBackend'
function FormatInmueble() {
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [horaEntrega, setHoraEntrega] = useState('')
  const [inmueble, setInmueble] = useState('')
  const [condominio, setCondominio] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [cantidadLlaves, setCantidadLLaves] = useState('')
  const [magneticas, setMagnetica] = useState('')
  const [tarjetas, setTarjetas] = useState('')
  const [controlAcceso, setControlAcceso] = useState('')
  const [PinturaParedes, setPinturaParedes] = useState('')
  const [TechoPintura, setTechoPintura] = useState('')
  const [PinturaPuertas, setPinturaPuertas] = useState('')
  const [PuertaCloset, setPuertaCloset] = useState('')
  const [CocinaPuerta, setCocinaPuerta] = useState('')
  const [cocina, setCocina] = useState('')
  const [limpieza, setLimpieza] = useState('')
  const [batea, setBatea] = useState('')
  const [lavaPlatos, setLavaPlatos] = useState('')
  const [cocinaEstado, setCocinaEstado] = useState('')
  const [pocetas, setPocetas] = useState('')
  const [lavamanos, setLavamanos] = useState('')
  const [ventanas, setVentanas] = useState('')
  const [aireacondicionado, setAireacondicionado] = useState('')
  const [cantv, setCantv] = useState('')
  const [gas, setGas] = useState('')
  const [internet, setInternet] = useState('')
  const [corpoelec, setCorpoelec] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      fechaEntrega,
      horaEntrega,
      inmueble,
      condominio,
      inquilino,
      cantidadLlaves,
      magneticas,
      tarjetas,
      controlAcceso,
      PinturaParedes,
      TechoPintura,
      PinturaPuertas,
      PuertaCloset,
      CocinaPuerta,
      cocina,
      limpieza,
      batea,
      lavaPlatos,
      cocinaEstado,
      pocetas,
      lavamanos,
      ventanas,
      aireacondicionado,
      cantv,
      gas,
      internet,
      corpoelec,
      observaciones
    }

    try {
      const response = await axiosInstance.post('/inmueble-entrega', data).then((response) => {
        console.log(response)
        const downloadUrl = `${ruta}/${response.data.file_path}`
        const dowloandLink = document.createElement('a')
        dowloandLink.href = downloadUrl
        dowloandLink.setAttribute('download', '')
        document.body.appendChild(dowloandLink)
        dowloandLink.click()
        document.body.removeChild(dowloandLink)
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container-fluid">
      <div className="container mt-3">
        <h3 className="text-center ">Formato de Inmueble</h3>
      </div>

      <div className="container row mx-auto d-flex align-items-center justify-content-center  mt-3">
        <div className="form-group col-md-6">
          <label htmlFor="fechaEntrega">Fecha de entrega</label>
          <input
            type="date"
            onChange={(e) => setFechaEntrega(e.target.value)}
            className="form-control"
            id="fechaEntrega"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="tipo">Hora de Entrega</label>
          <input
            type="time"
            className="form-control"
            id="tipo"
            onChange={(e) => setHoraEntrega(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="inmueble">Inmueble</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInmueble(e.target.value)}
            id="inmueble"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inquilino">Inquilino</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInquilino(e.target.value)}
            id="inquilino"
          />
        </div>

        <div className="separator"></div>
        <p className="fs-5 text-muted text-center">Hace Entrega de</p>

        <div className="form-group col-md-6">
          <label htmlFor="cantidadLlaves">Juego de llaves</label>
          <input
            type="text"
            className="form-control"
            id="cantidadLlaves"
            onChange={(e) => setCantidadLLaves(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="magneticas">Llaves Magneticas</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMagnetica(e.target.value)}
            id="magneticas"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="tarjetas">Tarjetas Mecanicas</label>
          <input
            type="text"
            className="form-control"
            id="tarjetas"
            onChange={(e) => setTarjetas(e.target.value)}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="controlAcceso">Control de Acceso</label>
          <input
            type="text"
            className="form-control"
            id="controlAcceso"
            onChange={(e) => setControlAcceso(e.target.value)}
          />
        </div>
        <div className="separator"></div>
        <p className="text-center text-muted fs-5">Estado del Apartamento</p>
        <div className="form-group col-md-6">
          <label htmlFor="">Pintura de paredes</label>
          <input
            type="text"
            className="form-control"
            id="PinturaParedes"
            onChange={(e) => setPinturaParedes(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="">Pintura del techo</label>
          <input
            type="text"
            className="form-control"
            id="TechoPintura"
            onChange={(e) => setTechoPintura(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="">Pintura de puertas</label>
          <input
            type="text"
            className="form-control"
            id="PinturaPuertas"
            onChange={(e) => setPinturaPuertas(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="PuertaCloset">Puerta de clósets</label>
          <input
            type="text"
            className="form-control"
            id="PuertaCloset"
            onChange={(e) => setPuertaCloset(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="CocinaPuerta">Puertas cocina</label>
          <input
            type="text"
            className="form-control"
            id="CocinaPuerta"
            onChange={(e) => setCocinaPuerta(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="cocina">Limpieza de cocina</label>
          <input
            type="text"
            className="form-control"
            id="cocina"
            onChange={(e) => setCocina(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="limpieza">Limpieza general</label>
          <input
            type="text"
            className="form-control"
            id="limpieza"
            onChange={(e) => setLimpieza(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="batea">Batea</label>
          <input
            type="text"
            className="form-control"
            id="batea"
            onChange={(e) => setBatea(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="lavaPlatos">Lavaplatos</label>
          <input
            type="text"
            className="form-control"
            id="lavaPlatos"
            onChange={(e) => setLavaPlatos(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="cocinaEstado">Estado de cocina</label>
          <input
            type="text"
            className="form-control"
            id="cocinaEstado"
            onChange={(e) => setCocinaEstado(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="pocetas">Pocetas</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPocetas(e.target.value)}
            id="pocetas"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="lavamanos">Lavamanos</label>
          <input
            type="text"
            className="form-control"
            id="lavamanos"
            onChange={(e) => setLavamanos(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="ventanas">Ventanas</label>
          <input
            type="text"
            className="form-control"
            id="ventanas"
            onChange={(e) => setVentanas(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="aireacondicionado"> Mtto Aire Acondicionado</label>
          <input
            type="text"
            className="form-control"
            id="aireacondicionado"
            onChange={(e) => setAireacondicionado(e.target.value)}
          />
        </div>

        <div className="separator"> </div>
        <p className="text-center text-muted fs-5">Recibos de Pagos de Servicios</p>
        <div className="form-group col-md-6">
          <label htmlFor="cantv">Cantv</label>
          <input
            type="text"
            className="form-control"
            id="cantv"
            onChange={(e) => setCantv(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gas">Gas</label>
          <input
            type="text"
            className="form-control"
            id="gas"
            onChange={(e) => setGas(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="internet">Clave e internet</label>
          <input
            type="text"
            className="form-control"
            id="internet"
            onChange={(e) => setInternet(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="corpoelec">Corpoelec</label>
          <input
            type="text"
            className="form-control"
            id="corpoelec"
            onChange={(e) => setCorpoelec(e.target.value)}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="condominio">Condominio</label>
          <input
            type="text"
            className="form-control"
            id="condominio"
            onChange={(e) => setCondominio(e.target.value)}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            type="text"
            className="form-control"
            id="observaciones"
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
      </div>

      <div className="container d-flex">
        <button type="submit" className="btn mx-auto mt-2 btn-primary" onClick={handleSubmit}>
          Generar
        </button>
      </div>
    </div>
  )
}

export default FormatInmueble
