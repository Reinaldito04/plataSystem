import PropTypes from 'prop-types'

function ReusableCard({ title, text, imgSrc, bgColor, textColor, fuction }) {
  return (
    <div
      className={`card ${textColor}`}
      style={{
        backgroundColor: bgColor
      }}
      onClick={fuction}
    >
      {imgSrc && <img src={imgSrc} className="card-img-top" alt="Card image cap" />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  )
}

ReusableCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  fuction: PropTypes.func
}

ReusableCard.defaultProps = {
  imgSrc: null,
  bgColor: 'bg-light', // default Bootstrap background color
  textColor: 'text-dark', // default Bootstrap text color
  fuction: null
}

export default ReusableCard
