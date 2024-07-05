import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import { useState } from 'react'
import FormatNotificacionCondominio from '../components/FormatNotificacionCondominio'
import FormatNotificacionVehiculos from '../components/FormatNotificacionVehiculos'
import FormartInquilino from '../components/FormartInquilino'
import FormatInmueble from '../components/FormatInmueble'
function Formats() {
  const [activeCard, setActiveCard] = useState('') // Estado para la tarjeta activa
  const handleCardClick = (card) => {
    setActiveCard(card)
  }

  const renderOptionsContent = () => {
    switch (activeCard) {
      case 'Notificacion':
        return <FormatNotificacionCondominio />
      case 'Vehiculos':
        return <FormatNotificacionVehiculos />
      case 'Inquilino':
        return <FormartInquilino />
      case 'Inmueble':
        return <FormatInmueble />
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
            title="Formato para vehiculos"
            text="Formato para solicitar estacionamiento al condominio"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
            fuction={() => handleCardClick('Vehiculos')}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <ReusableCard
            title="Formato de registro de inquilino"
            text="Formato para registrar inquilino y demás información "
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
            fuction={() => handleCardClick('Inquilino')}
          />
        </div>
        <div className="col-md-6">
          <ReusableCard
            title="Formato de entrega de inmueble"
            text="Formato para entregar inmueble y demas información "
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
            fuction={() => handleCardClick('Inmueble')}
          />
        </div>
      </div>

      <div className="container mt-3">{renderOptionsContent()}</div>
    </Layout>
  )
}

export default Formats
