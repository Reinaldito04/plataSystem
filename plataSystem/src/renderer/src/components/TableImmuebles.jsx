import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Propietario',
    selector: (row) => row.title,
    sortable: true
  },
  {
    name: 'Ubicación',
    selector: (row) => row.location,
    sortable: true
  },
  {
    name: 'Tipo',
    selector: (row) => row.type,
    sortable: true
  },
  {
    name: 'Alquilado por',
    selector: (row) => row.rentedBy,
    sortable: true
  }
]

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    location: 'New York',
    type: 'Apartment',
    rentedBy: 'John Doe'
  },
  {
    id: 2,
    title: 'Ghostbusters',
    location: 'Los Angeles',
    type: 'House',
    rentedBy: 'Jane Smith'
  }
  // Añade más datos según sea necesario
]

function TableImmuebles() {
  const [filterText, setFilterText] = useState('')

  const filteredItems = data.filter(
    (item) => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataTable columns={columns} data={filteredItems} pagination />
    </div>
  )
}

export default TableImmuebles
