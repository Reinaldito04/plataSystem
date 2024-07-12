import Layout from '../components/SideBarLayout'

import TableClients from '../components/TableClients'
import AddClient from '../components/AddClient'
function Clients() {
  return (
    <Layout>
      <h3 className="text-center">Clientes Registrados</h3>

      <div className="container-fluid">
        <TableClients />
      </div>
      <div className="container d-flex">
        <AddClient />
      </div>
    </Layout>
  )
}

export default Clients
