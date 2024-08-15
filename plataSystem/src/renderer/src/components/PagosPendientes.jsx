import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
function PagosPendientes() {
  const [pendientes, setPendientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch pending payments from the endpoint
    axiosInstance
      .get('/getPendingPayments')
      .then((response) => {
        setPendientes(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError('Error al cargar los pagos pendientes')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Cargando pagos pendientes...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h4>Pagos Pendientes</h4>
      <div className="container-fluid">
        {pendientes.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID contrato</th>
                <th>Cliente</th>
                <th>Inmueble</th>
                <th>Propietario</th>
                <th>Monto Deuda</th>
                <th>Dia de Pago</th>
                <th>Fecha Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((pago) => (
                <tr key={pago.id}>
                  <td>{pago.ContratoID}</td>
                  <td>
                    {pago.ClienteNombre} {pago.ClienteApellido}{' '}
                  </td>
                  <td>{pago.InmuebleDireccion}</td>
                  <td>
                    {pago.PropietarioNombre} {pago.PropietarioApellido}{' '}
                  </td>
                  <td>{pago.DeudaPendiente}$</td>
                  <td>{pago.DiaPrimerPago} </td>
                  <td>{pago.FechaVencimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pagos pendientes.</p>
        )}
      </div>
    </div>
  )
}

export default PagosPendientes
