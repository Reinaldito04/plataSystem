import Layout from '../components/SideBarLayout'
import AddArriendo from '../components/AddArriendo'
import TableArriendos from '../components/TableArriendos'

function Arredamientos() {
  return (
    <Layout>
      <h3 className="text-center">Arrendamientos</h3>
      <div className="container-fluid">
        <TableArriendos />
        <AddArriendo />
      </div>
    </Layout>
  )
}

export default Arredamientos
