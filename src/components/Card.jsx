import '../sass/Card.scss'

const Card = ({name, img}) => {
  return (
    <div className="card">
        <p className="card__name">{name}</p>
        <div className="card__circle"></div>
        <img src={img} alt="pokemon" className="card__img" />
    </div>
  )
}

export default Card