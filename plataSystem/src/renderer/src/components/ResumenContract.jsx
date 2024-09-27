import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types' // Importa PropTypes
import axiosInstance from '../utils/BackendConfig'

const ResumenContract = ({ IdContract }) => {
  const [detailsFromBackend, setDetailsFromBackend] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para obtener los datos
  const fetchData = async (IdContract) => {
    try {
      setLoading(true) // Empezamos la carga
      const response = await axiosInstance.get(`/report-pays/${IdContract}`)
      setDetailsFromBackend(response.data)
      setError(null) // Si la petición es exitosa, reseteamos cualquier error
    } catch (err) {
      setError('Error al obtener los datos')
      console.error('Error al obtener los datos:', err)
    } finally {
      setLoading(false) // Finalizamos la carga
    }
  }

  // Usamos useEffect para obtener los datos al montar el componente o cuando cambie IdContract
  useEffect(() => {
    if (IdContract) {
      fetchData(IdContract)
    }
  }, [IdContract])

  // Si estamos cargando
  if (loading) {
    return <p>Cargando detalles del contrato...</p>
  }

  // Si hay un error
  if (error) {
    return <p>{error}</p>
  }

  // Si no hay datos disponibles
  if (!detailsFromBackend) {
    return <p>No se encontraron detalles del contrato.</p>
  }

  return (
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
            <td>{detailsFromBackend.INQUILINO || 'N/A'}</td>
          </tr>
          <tr>
            <td>Contacto</td>
            <td>{detailsFromBackend.N_CONTACTO || 'N/A'}</td>
          </tr>
          <tr>
            <td>Correo</td>
            <td>{detailsFromBackend.CORREO || 'N/A'}</td>
          </tr>
          <tr>
            <td>Inmueble</td>
            <td>{detailsFromBackend.INMUEBLE || 'N/A'}</td>
          </tr>
          <tr>
            <td>Fecha de Contrato</td>
            <td>{detailsFromBackend.FECHA_CONTRATO || 'N/A'}</td>
          </tr>
          <tr>
            <td>Canon</td>
            <td>{detailsFromBackend.CANON || 'N/A'}</td>
          </tr>
          <tr>
            <td>Depósito en Garantía</td>
            <td>{detailsFromBackend.DEPOSITO_EN_GARANTIA || 'N/A'}</td>
          </tr>

          {/* Canones Mensuales */}
          <tr>
            <td>Canones Mensuales</td>
            <td>
              {Array.isArray(detailsFromBackend.CANONES_MENSUALES) &&
              detailsFromBackend.CANONES_MENSUALES.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Mes</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailsFromBackend.CANONES_MENSUALES.map((canon, index) => (
                      <tr key={index}>
                        <td>{canon['CANON MES'] || 'N/A'}</td>
                        <td>{canon.Cantidad || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay canones mensuales disponibles</p>
              )}
            </td>
          </tr>

          <tr>
            <td>Total Contrato</td>
            <td>{detailsFromBackend.TOTAL_CONTRATO || 'N/A'}</td>
          </tr>

          {/* Depósitos Efectuados */}
          <tr>
            <td>Depósitos Efectuados</td>
            <td>
              {Array.isArray(detailsFromBackend.DEPOSITOS_EFECTUADOS) &&
              detailsFromBackend.DEPOSITOS_EFECTUADOS.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Modalidad</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailsFromBackend.DEPOSITOS_EFECTUADOS.map((deposito, index) => (
                      <tr key={index}>
                        <td>{deposito.Fecha || 'N/A'}</td>
                        <td>{deposito.MODALIDAD || 'N/A'}</td>
                        <td>{deposito.Cantidad || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay depósitos efectuados</p>
              )}
            </td>
          </tr>

          <tr>
            <td>Total Depositado</td>
            <td>{detailsFromBackend.TOTAL_DEPOSITADO || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// Definimos las PropTypes
ResumenContract.propTypes = {
  IdContract: PropTypes.string.isRequired // Aseguramos que IdContract es requerido y debe ser una cadena de texto
}

export default ResumenContract
