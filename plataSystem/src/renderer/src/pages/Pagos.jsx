import { useState } from 'react'
import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import PagosInquilinos from '../components/PagosInquilinos'
import PagosServicios from '../components/PagosServicios'
import PagosGestion from '../components/PagosGestion'
function Pagos() {
  const [activeCard, setActiveCard] = useState('') // Estado para la tarjeta activa

  const handleCardClick = (card) => {
    setActiveCard(card)
  }

  const renderOptionsContent = () => {
    switch (activeCard) {
      case 'Inquilinos':
        return <PagosInquilinos Tipo="Empresa" />
      case 'Empresa':
        return <PagosInquilinos Tipo="Personal" />
      case 'Servicios':
        return (
          <div>
            <p className="text-center">Pagos de Servicios</p>
            <div className="container-fluid">
              <PagosServicios />
            </div>
          </div>
        )
      case 'GestionCobro':
        return (
          <div className="">
            <p className="text-center">Gestion de Cobro</p>
            <div className="container-fluid">
              <PagosGestion />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Layout>
      <h3 className="text-center">Pagos</h3>
      <div className="container row mt-5">
        <div className="col-md-6">
          <ReusableCard
            fuction={() => handleCardClick('Inquilinos')}
            title="Pagos por inquilinos"
            text="Pagos de inquilinos hacia la empresa"
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
          />
        </div>
        <div className="col-md-6">
          <ReusableCard
            fuction={() => handleCardClick('Empresa')}
            title="Pagos de empresa"
            text="Pagos de empresa hacia propietarios"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
          />
        </div>

        <div className="col-md-6 mt-2">
          <ReusableCard
            fuction={() => handleCardClick('Servicios')}
            title="Pagos de servicios"
            text="Pagos de servicios o cualquier otro tipo (remodelación, etc)"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
          />
        </div>
        <div className="col-md-6 mt-2">
          <ReusableCard
            fuction={() => handleCardClick('GestionCobro')}
            title="Gestion de Cobro"
            text="Pagos propuestos (comprometidos)"
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
          />
        </div>
        <div className="container mt-3">{renderOptionsContent()}</div>
      </div>
    </Layout>
  )
}

export default Pagos
