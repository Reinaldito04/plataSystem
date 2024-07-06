import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axiosInstance from '../utils/BackendConfig'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
const columns = [
  {
    name: 'id',
    selector: (row) => row.id
  },
  {
    name: 'Descripción',
    selector: (row) => row.description,
    sortable: true,
    cell: (row) => {
      return (
        <Tippy content={row.description}>
          <div>{row.description}</div>
        </Tippy>
      )
    }
  },
  {
    name: 'Realizado por ',
    selector: (row) => row.username
  }
]

function UserActivity() {
  const [data, setData] = useState([])
  useEffect(() => {
    axiosInstance
      .get('/getInformationUsers')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error)
      })
  }, [])
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
