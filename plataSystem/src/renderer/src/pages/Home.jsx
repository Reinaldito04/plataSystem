import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import logo from '../assets/Images/logo.png'
import './styles/Home.css'
import Birthdays from '../components/Birthdays'
import CuotasPorVencer from '../components/CuotasPorVencer'
import ContratosPorVencer from '../components/ContratosPorVencer'
import { useState, useEffect } from 'react'
function Home() {
  const [user, setUser] = useState('')
  const localstorageUSer = async () => {
    const user = localStorage.getItem('username')
    setUser(user)
  }
  useEffect(() => {
    localstorageUSer()
  }, [])

  const [activeCard, setActiveCard] = useState('') // Estado para la tarjeta activa
  const handleCardClick = (card) => {
    setActiveCard(card)
  }

  const renderContent = () => {
    switch (activeCard) {
      case 'Cuotas por vencer':
        return <CuotasPorVencer />
      case 'Cumpleaños':
        return <Birthdays />
      case 'Servicios por pagar':
        return (
          <div>
            <h4>Contenido de Servicios por pagar</h4>
          </div>
        )
      case 'Contratos por vencer':
        return <ContratosPorVencer />
      default:
        return <p>Haz clic en una tarjeta para ver el contenido.</p>
    }
  }
  return (
    <Layout>
      <h3 className="text-center">Bienvenido a Inmoplata, {user}</h3>
      <div className="container mt-5">
        <div className="row container">
          <div className="col-md-6">
            <ReusableCard
              title="Cumpleaños del mes"
              text="Los cumpleaños más cercanos del mes actual"
              bgColor="rgb(116, 155, 194)"
              textColor="text-white"
              fuction={() => handleCardClick('Cumpleaños')}
            />
          </div>

          <div className="col-md-6">
            <ReusableCard
              title="Cuotas por vencer"
              text="Pagos de inquilinos por cobrar del mes actual"
              bgColor="rgb(70, 130, 169)"
              textColor="text-white"
              fuction={() => handleCardClick('Cuotas por vencer')}
            />
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="row container">
          <div className="col-md-6">
            <ReusableCard
              title="Servicios por pagar"
              text="Los servicios domesticos por cobrar"
              bgColor="rgb(70, 130, 169)"
              textColor="text-white"
              fuction={() => handleCardClick('Servicios por pagar')}
            />
          </div>

          <div className="col-md-6">
            <ReusableCard
              title="Contratos por vencer"
              text="Contratos  por vencer del mes actual"
              bgColor="rgb(116, 155, 194)"
              textColor="text-white"
              fuction={() => handleCardClick('Contratos por vencer')}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <img className="logo" src={logo} alt="" />
      </div>

      <div className="mt-2">{renderContent()}</div>
    </Layout>
  )
}

export default Home
