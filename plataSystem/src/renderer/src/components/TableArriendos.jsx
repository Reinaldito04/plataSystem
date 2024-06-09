import DataTable from 'react-data-table-component'
import { useState } from 'react'
const columns = [
  {
    name: 'Alquilado Por',
    selector: (row) => row.title
  },
  {
    name: 'Propietario',
    selector: (row) => row.year
  },
  {
    name: 'Desde',
    selector: (row) => row.year
  },
  {
    name: 'Hasta',
    selector: (row) => row.year
  }
]

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984'
  }
]
function TableArriendos() {
  const [filterText, setFilterText] = useState('')

  const filteredItems = data.filter(
    (item) => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  )
  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataTable columns={columns} data={filteredItems} pagination></DataTable>
    </>
  )
}

export default TableArriendos
