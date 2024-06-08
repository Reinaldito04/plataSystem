import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
import logo from '../assets/Images/logo.png'
import './styles/Home.css'
function Home() {
  return (
    <Layout>
      <h3 className="text-center">Bienvenido a Inmoplata</h3>
      <div className="container mt-5">
        <div className="row container">
          <div className="col-md-6">
            <ReusableCard
              title="Cumpleaños del mes"
              text="Los cumpleaños más cercanos del mes actual"
              bgColor="rgb(116, 155, 194)"
              textColor="text-white"
            />
          </div>

          <div className="col-md-6">
            <ReusableCard
              title="Cuotas por vencer"
              text="Pagos de inquilinos por cobrar del mes actual"
              bgColor="rgb(70, 130, 169)"
              textColor="text-white"
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
            />
          </div>

          <div className="col-md-6">
            <ReusableCard
              title="Contratos por vencer"
              text="Contratos  por vencer del mes actual"
              bgColor="rgb(116, 155, 194)"
              textColor="text-white"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <img className="logo" src={logo} alt="" />
      </div>
    </Layout>
  )
}

export default Home
