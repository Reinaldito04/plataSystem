import { useState } from 'react'
import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import UserActivity from '../components/UserActivity'
import AddUsers from '../components/AddUsers'
import DeleteUser from '../components/DeleteUser'
import EditUser from '../components/EditUser'
function Users() {
  const [activeCard, setActiveCard] = useState('') // Estado para la tarjeta activa
  const [optionsUsers, setOptionsUsers] = useState('') // Estado para las opciones de usuario

  const handleCardClick = (card) => {
    setActiveCard(card)
    setOptionsUsers('') // Resetear las opciones de usuario al cambiar de tarjeta
  }

  const renderOptionsContent = () => {
    switch (optionsUsers) {
      case 'Agregar':
        return <AddUsers />
      case 'Modificar':
        return <EditUser />
      case 'Eliminar':
        return <DeleteUser />

      default:
        return null
    }
  }

  const renderContent = () => {
    switch (activeCard) {
      case 'Actividad de usuarios':
        return <UserActivity />
      case 'Registro de usuarios':
        return (
          <div>
            <div className="container-fluid mx-auto text-center">
              <button onClick={() => setOptionsUsers('Agregar')} className="btn text-center">
                Agregar
              </button>
              <button onClick={() => setOptionsUsers('Eliminar')} className="btn text-center">
                Eliminar
              </button>
              <button onClick={() => setOptionsUsers('Modificar')} className="btn text-center">
                Modificar
              </button>
            </div>
            <div className="mt-3">{renderOptionsContent()}</div>
          </div>
        )
      default:
        return <p>Haz clic en una tarjeta para ver el contenido.</p>
    }
  }

  return (
    <Layout>
      <h3 className="text-center">Usuarios</h3>
      <div className="container row mt-2">
        <div className="col-md-6">
          <ReusableCard
            title="Actividad de usuarios"
            text="Registro de las actividades de los usuarios"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
            fuction={() => handleCardClick('Actividad de usuarios')}
          />
        </div>

        <div className="col-md-6">
          <ReusableCard
            title="Registro de usuarios"
            text="Registrar, modificar y eliminar usuarios"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
            fuction={() => handleCardClick('Registro de usuarios')}
          />
        </div>
      </div>
      <div className="mt-3">{renderContent()}</div>
    </Layout>
  )
}

export default Users
