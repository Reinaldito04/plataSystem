import DataTable from 'react-data-table-component'
const columns = [
  {
    name: 'Usuario',
    selector: (row) => row.Usuario
  },
  {
    name: 'Descripcion',
    selector: (row) => row.Descripcion
  },
  {
    name: 'Fecha',
    selector: (row) => row.Date
  }
]

const data = [
  {
    id: 1,
    Usuario: 'Beetlejuice',
    Descripcion: '1988',
    Date: '2023'
  },
  {
    id: 2,
    Usuario: 'Ghostbusters',
    Descripcion: '1984',
    Date: '2024'
  }
]
function UserActivity() {
  return (
    <>
      <p className="text-center">Actividades realizadas por los usuarios</p>

      <div className="container-fluid">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  )
}

export default UserActivity
