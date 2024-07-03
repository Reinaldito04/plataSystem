import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import { useState } from 'react'
import TableContratosVencidos from '../components/TableContratosVencidos'
function Otros() {
  const [activeCard, setActiveCard] = useState('')

  const handleClick = (card) => {
    setActiveCard(card)
  }

  const renderOptionsContent = () => {
    switch (activeCard) {
      case 'ContratosVencidos':
        return <TableContratosVencidos />
      default:
        return null
    }
  }
  return (
    <Layout>
      <h3 className="text-center">Otros</h3>
      <div className="row">
        <div className="col-md-6">
          <ReusableCard
            title="Contratos Vencidos"
            text="En esta sección se visualiza los contratos desactivados"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
            fuction={() => handleClick('ContratosVencidos')}
          />
        </div>
        <div className="col-md-6">
          <ReusableCard
            title="Casos Legales"
            text="En esta sección se visualiza los casos legales de los contratos"
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
          />
        </div>
      </div>

      <div className="mt-3">{renderOptionsContent()}</div>
    </Layout>
  )
}

export default Otros
