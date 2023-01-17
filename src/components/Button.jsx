import '../sass/Button.scss'

const Button = ({icon}) => {
  return (
    <div className='button__box'>
      <button className='button'>{icon}</button>
    </div>
  )
}

export default Button