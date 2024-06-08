import React from 'react'
import Layout from '../components/SideBarLayout'
import AddImmuebles from '../components/AddImmuebles'
import BarSearchImmuebles from '../components/BarSearchImmuebles'
import TableImmuebles from '../components/TableImmuebles'
import './styles/Immuebles.css'
function Immuebles() {
  return (
    <Layout>
      <BarSearchImmuebles />
      <div className="contentImmuebles">
        <h3 className="text">Inmuebles</h3>
        <p className="text">En esta sección se registran los inmuebles de la empresa</p>
        <TableImmuebles />
      </div>

      <AddImmuebles />
    </Layout>
  )
}

export default Immuebles
