import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import { useState } from 'react'
import FormatNotificacionCondominio from '../components/FormatNotificacionCondominio'
function Formats() {
  const [activeCard, setActiveCard] = useState('') // Estado para la tarjeta activa
  const handleCardClick = (card) => {
    setActiveCard(card)
  }

  const renderOptionsContent = () => {
    switch (activeCard) {
      case 'Notificacion':
        return <FormatNotificacionCondominio />
      case 'Empresa':
        return <p>Notificacion</p>
      case 'Servicios':
        return <p>Contenido para pagos de servicios aquí</p>
      case 'Contratos':
        return <p>Contenido para contratos aquí</p>
      default:
        return null
    }
  }
  return (
    <Layout>
      <h2 className="text-center">Formatos</h2>
      <div className="row">
        <div className="col-md-6">
          <ReusableCard
            title="Formato para Condominio"
            text="Formato para notificar al condominio "
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
            fuction={() => handleCardClick('Notificacion')}
          />
        </div>
        <div className="col-md-6">
          <ReusableCard
            title="Pagos de empresa"
            text="Pagos de empresa hacia propietarios"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
          />
        </div>
      </div>
      <div className="container mt-3">{renderOptionsContent()}</div>
    </Layout>
  )
}

export default Formats
