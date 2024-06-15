import Layout from '../components/SideBarLayout'

import TableInquilinos from '../components/TableInquilinos'
import AddInquilino from '../components/AddInquilino'

function Inquilinos() {
  return (
    <Layout>
      <h3 className="text-center">Inquilinos Registrados</h3>

      <div className="container-fluid">
        <TableInquilinos />
      </div>
    </Layout>
  )
}

export default Inquilinos
