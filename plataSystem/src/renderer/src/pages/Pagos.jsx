import Layout from '../components/SideBarLayout'
import ReusableCard from '../components/CardWelcome'
function Pagos() {
  return (
    <Layout>
      <h3 className="text-center">Pagos</h3>
      <div className="container row mt-5">
        <div className="col-md-6">
          <ReusableCard
            title="Pagos por inquilinos"
            text="Pagos de inquilinos hacia la empresa "
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
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

        <div className="col-md-6 mt-2">
          <ReusableCard
            title="Pagos de servicios"
            text="Pagos de servicios o cualquier otro tipo (remodelación,etc)"
            bgColor="rgb(70, 130, 169)"
            textColor="text-white"
          />
        </div>
        <div className="col-md-6 mt-2">
          <ReusableCard
            title="Contratos "
            text="Contratos de propietarios e inquilinos"
            bgColor="rgb(116, 155, 194)"
            textColor="text-white"
          />
        </div>
      </div>
    </Layout>
  )
}

export default Pagos
