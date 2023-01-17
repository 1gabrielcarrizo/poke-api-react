import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import './sass/App.scss'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Card from './components/Card';

const App = () => {

  const [pokemonId, setPokemonId] = useState(1)
  const [pokemonName, setPokemonName] = useState("")

  const incrementar = () => {
    setPokemonId(pokemonId + 1)
  }

  const decrementar = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1)
  }

  const searchPokemon = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    const data = await response.json()
    setPokemonName(data.name)
  }

  // para tener el valor actualizado con el render, se usa el useEffect
  useEffect(() => {
    console.log(`Valor al actualizar el estado: ${pokemonId}`)
    // aqui llamamos al API
    // FORMA 2 DE USAR EL FETCH
    searchPokemon(pokemonId)
  },[pokemonId])
  

  return (
    <>
    <div className="cards__container">
      <Card/>
    </div>
    
      <div className='buttons-container'>
        <Button 
          icon={<TiArrowLeftOutline/>}
          handleClick={decrementar}/>
          {`${pokemonId} - ${pokemonName}`}
        <Button 
        icon={<TiArrowRightOutline/>}
        handleClick={incrementar}/>
      </div>
    </>
  )
}

export default App