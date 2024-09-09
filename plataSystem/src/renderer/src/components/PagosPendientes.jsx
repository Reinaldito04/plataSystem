import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/BackendConfig'
import DataTable, { createTheme } from 'react-data-table-component'
import { format } from 'date-fns'

// Configura un tema claro personalizado
createTheme('light', {
  text: {
    primary: '#2c3e50',
    secondary: '#7f8c8d'
  },
  background: {
    default: '#ecf0f1'
  },
  context: {
    background: '#e74c3c',
    text: '#FFFFFF'
  },
  divider: {
    default: '#bdc3c7'
  },
  button: {
    default: '#34495e',
    hover: 'rgba(52, 73, 94, 0.8)',
    focus: 'rgba(52, 73, 94, 0.6)'
  },
  highlightOnHover: {
    default: '#dfe6e9',
    text: '#2c3e50'
  },
  selected: {
    default: '#3498db',
    text: '#FFFFFF'
  },
  rows: {
    fontColor: '#2c3e50',
    background: '#FFFFFF',
    borderColor: '#ecf0f1'
  }
})

function PagosPendientes() {
  const [pendientes, setPendientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
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

  const columns = [
    {
      name: 'ID contrato',
      selector: (row) => row.ContratoID,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Cliente',
      selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido}`,
      sortable: true,
      grow: 2
    },
    {
      name: 'Inmueble',
      selector: (row) => row.InmuebleDireccion,
      sortable: true,
      grow: 3
    },
    {
      name: 'Propietario',
      selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido}`,
      sortable: true,
      grow: 2
    },
    {
      name: 'Monto Deuda',
      selector: (row) => `${row.DeudaPendiente}$`,
      sortable: true,
      right: true,
      conditionalCellStyles: [
        {
          when: (row) => row.DeudaPendiente > 1000,
          style: {
            color: 'red',
            fontWeight: 'bold'
          }
        }
      ]
    },
    {
      name: 'Día de Pago',
      selector: (row) => row.DiaPrimerPago,
      sortable: true,
      center: true
    },
    {
      name: 'Fecha Vencimiento',
      selector: (row) => format(new Date(row.FechaVencimiento), 'dd/MM/yyyy'),
      sortable: true,
      center: true
    }
  ]

  const filteredItems = pendientes.filter(
    (item) =>
      item.ClienteNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ClienteApellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.InmuebleDireccion.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioApellido.toLowerCase().includes(filterText.toLowerCase())
  )

  if (loading) {
    return <p>Cargando pagos pendientes...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h4>Pagos Pendientes</h4>
      <div
        className="container-fluid"
        style={{
          maxWidth: '800px',
          overflowY: 'auto'
        }}
      >
        <input
          type="text"
          placeholder="Buscar..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="form-control mb-3"
        />
        {filteredItems.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            highlightOnHover
            striped
            dense
            theme="light"
            customStyles={{
              headCells: {
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#bdc3c7',
                  color: '#2c3e50'
                }
              },
              cells: {
                style: {
                  fontSize: '13px',
                  color: '#2c3e50'
                }
              },
              rows: {
                style: {
                  minHeight: '45px'
                }
              }
            }}
          />
        ) : (
          <p>No hay pagos pendientes.</p>
        )}
      </div>
    </div>
  )
}

export default PagosPendientes
