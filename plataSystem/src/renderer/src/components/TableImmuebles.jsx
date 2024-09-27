import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import CustomModal from './ModalInmueble'
const columns = [
  {
    name: 'ID',
    selector: (row) => row.ID,
    sortable: true
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.NombrePropietario} ${row.ApellidoPropietario}`,
    sortable: true
  },
  {
    name: 'Nombre',
    selector: (row) => row.Direccion,
    sortable: true
  },
  {
    name: 'Ubicacion',
    selector: (row) => row.Municipio,
    sortable: true
  },
  {
    name: 'Tipo',
    selector: (row) => row.Tipo,
    sortable: true
  },
  {
    name: 'Estacionamiento',
    selector: (row) => row.Estacionamiento,
    sortable: true
  }
]

function TableImmuebles() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedOption, setSelectedOption] = useState('') // Estado para la opción seleccionada

  const handleRowClick = (row) => {
    setSelectedRow(row)
    setModalIsOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getInmuebles')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
   
    <DataTable
        columns={columns}
        data={data}
        pagination
        onRowClicked={handleRowClick} // Asigna la función handleRowClick al evento onRowClicked
      />
   
      

      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        selectedRow={selectedRow}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  )
}

export default TableImmuebles
