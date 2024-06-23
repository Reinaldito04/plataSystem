import '../pages/styles/Format.css'
import axiosInstance from '../utils/BackendConfig'
import { useState } from 'react'
import ruta from '../utils/RutaBackend'

function FormartInquilino() {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono1: '',
    email: '',
    nacimiento: '',
    telefono2: '',
    nombrepareja: '',
    telefonopareja: '',
    cantidadpersonas: '',
    nombrehabitante: '',
    telefonohabitante: '',
    hijos: '',
    cantidadhijos: '',
    mascotas: '',
    cantidadmacostas: '',
    tipomascota: '',
    inmueblepropietario: '',
    inmuebleunibcacion: '',
    contacto: '',
    arrendadoanteriormente: '',
    arrendadornombre: '',
    arrendadortelefono: '',
    fechadesocupacion: '',
    inmuebleubicacionanterior: '',
    causadesocupacion: '',
    religion: '',
    redes: '',
    empresanombre: '',
    economia: '',
    empresatelefono: '',
    empresamail: '',
    direccionempresa: '',
    cargo: '',
    tiempoempresa: '',
    empresapareja: '',
    empresaubicacionpareja: '',
    telefonoparejaempresa: '',
    empresaresponsable: '',
    economiaempresa: '',
    empresaresponsableubicacion: '',
    empresaresponsabletelefono: '',
    empresaresponsablemovil: '',
    empresaresponsablerif: '',
    empresaresponsablemail: '',
    respresentantelegal: '',
    dnirepresentnate: '',
    telefonorepresentante: '',
    nombrefamiliar: '',
    cedulafamiliar: '',
    telefono1familiar: '',
    telefono2familiar: '',
    parentescofamiliar: '',
    direccionfamiliar: '',
    nombrefamiliar2: '',
    cedulafamiliar2: '',
    telefono1familiar2: '',
    telefono2familiar2: '',
    parentescofamiliar2: '',
    direccionfamiliar2: '',
    nombrenofamiliar: '',
    cedulanofamiliar: '',
    telefono1nofamiliar: '',
    telefono2nofamiliar: '',
    direccionnofamiliar: '',
    nombrenofamiliar2: '',
    cedulanofamiliar2: '',
    telefono1nofamiliar2: '',
    telefono2nofamiliar2: '',
    direccionnofamiliar2: '',
    marca: '',
    modelo: '',
    placa: '',
    color: '',
    licencia: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance
        .post('/generate-inquilinoreporte', formData)
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
      console.log(response.data)
    } catch (error) {
      console.error('Error sending form data', error)
    }
  }

  return (
    <div className=" container-fluid mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Persona que Habitará el Inmueble</h2>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>C.I / Pasaporte</label>
            <input
              type="text"
              className="form-control"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>Teléfono 1</label>
            <input
              type="text"
              className="form-control"
              name="telefono1"
              value={formData.telefono1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              name="nacimiento"
              value={formData.nacimiento}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Teléfono 2</label>
            <input
              type="text"
              className="form-control"
              name="telefono2"
              value={formData.telefono2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>Nombre de Pareja</label>
            <input
              type="text"
              className="form-control"
              name="nombrepareja"
              value={formData.nombrepareja}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Teléfono Pareja</label>
            <input
              type="text"
              className="form-control"
              name="telefonopareja"
              value={formData.telefonopareja}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>N° de Personas que habitarán el Inmueble</label>
            <input
              type="text"
              className="form-control"
              name="cantidadpersonas"
              value={formData.cantidadpersonas}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Nombre Completo De Otro Habitante del Inmueble</label>
            <input
              type="text"
              className="form-control"
              name="nombrehabitante"
              value={formData.nombrehabitante}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label>Teléfono Otro Habitante</label>
            <input
              type="text"
              className="form-control"
              name="telefonohabitante"
              value={formData.telefonohabitante}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Tiene Niños(as)?</label>
            <input
              type="text"
              className="form-control"
              name="hijos"
              value={formData.hijos}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Cantidad de Hijos</label>
            <input
              type="text"
              className="form-control"
              name="cantidadhijos"
              value={formData.cantidadhijos}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Tienes Mascotas?</label>
            <input
              type="text"
              className="form-control"
              name="mascotas"
              value={formData.mascotas}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Cantidad de Mascotas</label>
            <input
              type="text"
              className="form-control"
              name="cantidadmacostas"
              value={formData.cantidadmacostas}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Tipo de Mascota</label>
            <input
              type="text"
              className="form-control"
              name="tipomascota"
              value={formData.tipomascota}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Es dueño de algun inmueble?</label>
            <input
              type="text"
              className="form-control"
              name="inmueblepropietario"
              value={formData.inmueblepropietario}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Ubicacion del inmueble</label>
            <input
              type="text"
              className="form-control"
              name="inmuebleunibcacion"
              value={formData.inmuebleunibcacion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Como nos contactó?</label>
            <input
              type="text"
              className="form-control"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Has tenido algun arriendo anteriormente?</label>
            <input
              type="text"
              className="form-control"
              name="arrendadoanteriormente"
              value={formData.arrendadoanteriormente}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre del arrendador anterior</label>
            <input
              type="text"
              className="form-control"
              name="arrendadornombre"
              value={formData.arrendadornombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono del arrendador</label>
            <input
              type="text"
              className="form-control"
              name="arrendadortelefono"
              value={formData.arrendadortelefono}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Fecha de desocupación</label>
            <input
              type="date"
              className="form-control"
              name="fechadesocupacion"
              value={formData.causadesocupacion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Ubicación del inmueble anterior</label>
            <input
              type="text"
              className="form-control"
              name="inmuebleubicacionanterior"
              value={formData.inmuebleubicacionanterior}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Causa de Desocupación</label>
            <input
              type="text"
              className="form-control"
              name="causadesocupacion"
              value={formData.causadesocupacion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Religión</label>
            <input
              type="text"
              className="form-control"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Redes Sociales</label>
            <input
              type="text"
              className="form-control"
              name="redes"
              value={formData.redes}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-capitalize">
          Ubicacion del trabajo de la persona que habitara el inmueble
        </h3>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre de la empresa</label>
            <input
              type="text"
              className="form-control"
              name="empresanombre"
              value={formData.empresanombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Actividad economica</label>
            <input
              type="text"
              className="form-control"
              name="economia"
              value={formData.economia}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono</label>
            <input
              type="text"
              className="form-control"
              name="empresatelefono"
              value={formData.empresatelefono}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Correo</label>
            <input
              type="text"
              className="form-control"
              name="empresamail"
              value={formData.empresamail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Direccion de la empresa</label>
            <input
              type="text"
              className="form-control"
              name="direccionempresa"
              value={formData.direccionempresa}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Cargo que ocupa</label>
            <input
              type="text"
              className="form-control"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Antiguedad en la empresa</label>
            <input
              type="text"
              className="form-control"
              name="tiempoempresa"
              value={formData.tiempoempresa}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre de la empresa donde ocupa su pareja</label>
            <input
              type="text"
              className="form-control"
              name="empresapareja"
              value={formData.empresapareja}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Ubicación de la empresa donde labora su pareja</label>
            <input
              type="text"
              className="form-control"
              name="empresaubicacionpareja"
              value={formData.empresaubicacionpareja}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono de la empresa donde labora su pareja</label>
            <input
              type="text"
              className="form-control"
              name="telefonoparejaempresa"
              value={formData.telefonoparejaempresa}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-capitalize">
          Empresa responsable del arrendamiento (en caso de contratar persona juridica)
        </h3>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre de la empresa</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsable"
              value={formData.empresaresponsable}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Actividad economica</label>
            <input
              type="text"
              className="form-control"
              name="economiaempresa"
              value={formData.economiaempresa}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Dirección de la empresa</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsableubicacion"
              value={formData.empresaresponsableubicacion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono Fijo</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsabletelefono"
              value={formData.empresaresponsabletelefono}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono Movil</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsablemovil"
              value={formData.empresaresponsablemovil}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">RIF</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsablerif"
              value={formData.empresaresponsablerif}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Correo electronico</label>
            <input
              type="text"
              className="form-control"
              name="empresaresponsablemail"
              value={formData.empresaresponsablemail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Representante legal ,nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="respresentantelegal"
              value={formData.respresentantelegal}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Cedula de identidad del representante legal</label>
            <input
              type="text"
              className="form-control"
              name="dnirepresentnate"
              value={formData.dnirepresentnate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono fijo/celular</label>
            <input
              type="text"
              className="form-control"
              name="telefonorepresentante"
              value={formData.telefonorepresentante}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-capitalize">Referencia personal que no habitara el inmueble</h3>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombrefamiliar"
              value={formData.nombrefamiliar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Cedula de identidad</label>
            <input
              type="text"
              className="form-control"
              name="cedulafamiliar"
              value={formData.cedulafamiliar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 1</label>
            <input
              type="text"
              className="form-control"
              name="telefono1familiar"
              value={formData.telefono1familiar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 2</label>
            <input
              type="text"
              className="form-control"
              name="cedulafamiliar"
              value={formData.telefono2familiar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Parentesco</label>
            <input
              type="text"
              className="form-control"
              name="parentescofamiliar"
              value={formData.parentescofamiliar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccionfamiliar"
              value={formData.direccionfamiliar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="separator"></div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombrefamiliar2"
              value={formData.nombrefamiliar2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Cedula de Identidad</label>
            <input
              type="text"
              className="form-control"
              name="cedulafamiliar2"
              value={formData.cedulafamiliar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 1</label>
            <input
              type="text"
              className="form-control"
              name="telefono1familiar2"
              value={formData.telefono1familiar2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 2</label>
            <input
              type="text"
              className="form-control"
              name="telefono2familiar2"
              value={formData.telefono2familiar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Parentesco</label>
            <input
              type="text"
              className="form-control"
              name="parentescofamiliar2"
              value={formData.parentescofamiliar2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccionfamiliar2"
              value={formData.direccionfamiliar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-capitalize mt-2">Referencia personal (que no sea familiar)</h3>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombrenofamiliar"
              value={formData.nombrenofamiliar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Cedula de Identidad</label>
            <input
              type="text"
              className="form-control"
              name="cedulanofamiliar"
              value={formData.cedulanofamiliar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 1 </label>
            <input
              type="text"
              className="form-control"
              name="telefono1nofamiliar"
              value={formData.telefono1nofamiliar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 2 </label>
            <input
              type="text"
              className="form-control"
              name="telefono2nofamiliar"
              value={formData.telefono2nofamiliar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Dirección </label>
            <input
              type="text"
              className="form-control"
              name="direccionnofamiliar"
              value={formData.direccionnofamiliar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="separator"></div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombrenofamiliar2"
              value={formData.nombrenofamiliar2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Cedula de Identidad</label>
            <input
              type="text"
              className="form-control"
              name="cedulanofamiliar2"
              value={formData.cedulanofamiliar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 1 </label>
            <input
              type="text"
              className="form-control"
              name="telefono1nofamiliar2"
              value={formData.telefono1nofamiliar2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Telefono 2 </label>
            <input
              type="text"
              className="form-control"
              name="telefono2nofamiliar2"
              value={formData.telefono2nofamiliar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Dirección </label>
            <input
              type="text"
              className="form-control"
              name="direccionnofamiliar2"
              value={formData.direccionnofamiliar2}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-capitalize">Datos de identificacion de vehiculo</h3>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Marca </label>
            <input
              type="text"
              className="form-control"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Modelo/Año </label>
            <input
              type="text"
              className="form-control"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Placa </label>
            <input
              type="text"
              className="form-control"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="">Color </label>
            <input
              type="text"
              className="form-control"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row container">
          <div className="form-group col-md-6">
            <label htmlFor="">Licencia </label>
            <input
              type="text"
              className="form-control"
              name="licencia"
              value={formData.licencia}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Additional fields go here */}
        <div className="container mx-auto text-center">
          <button type="submit" className="btn btn-primary mx-auto text-center mt-2">
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormartInquilino
