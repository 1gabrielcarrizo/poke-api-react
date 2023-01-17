import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import './sass/App.scss'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const App = () => {

  const [pokemonNumber, setPokemonNumber] = useState(1)
  const [pokemonName, setPokemonName] = useState("")

  const incrementar = () => {
    setPokemonNumber(pokemonNumber + 1)
    console.log(`Valor antes del render: ${pokemonNumber}`)
  }

  // para tener el valor actualizado con el render, se usa el useEffect
  useEffect(() => {
    console.log(`Valor al actualizar el estado: ${pokemonNumber}`)
    // aqui llamamos al API
    // FORMA 1 DE USAR EL FETCH

    // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    // .then(result => result.json())
    // .then(data => console.log(data.name)) // si quiero usar "data.name" dentro de todo este componente, hay que crear otro estado, quedando esta linea de la siguiente forma
    // .then(data => setPokemonName(data.name))

    // FORMA 2 DE USAR EL FETCH
    searchPokemon(pokemonNumber)
  },[pokemonNumber])
  
  const searchPokemon = async (pokemonNumber) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    const data = await response.json()
    setPokemonName(data.name)
  }

  return (
    <>
      {/* <button onClick={incrementar}>Next</button>
      <div>{pokemonNumber} - {pokemonName}</div> */}
      <div className='buttons-container'>
        <Button icon={<TiArrowLeftOutline/>}/>
        <Button icon={<TiArrowRightOutline/>}/>
      </div>
    </>
  )
}

export default App