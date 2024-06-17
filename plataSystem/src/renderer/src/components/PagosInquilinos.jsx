import TablePagosInquilinos from './TablePagosInquilinos'
import PropTypes from 'prop-types'

function PagosInquilinos({ Tipo }) {
  return (
    <div>
      {Tipo === 'Empresa' ? (
        <p className="text-center">Pagos Inquilinos</p>
      ) : (
        <p className="text-center">Pagos Empresa</p>
      )}
      <div className="container-fluid">
        <TablePagosInquilinos Tipo={Tipo} />
      </div>
    </div>
  )
}

PagosInquilinos.propTypes = {
  Tipo: PropTypes.string.isRequired
}

export default PagosInquilinos
