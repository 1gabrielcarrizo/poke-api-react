import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import './sass/App.scss'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Card from './components/Card';
import Container from 'react-bootstrap/Container';

const App = () => {

  const [pokemonId, setPokemonId] = useState(1)
  const [pokemonEvolutions, setpokemonEvolutions] = useState([])


  const incrementar = () => {
    setPokemonId(pokemonId + 1)
  }

  const decrementar = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1)
  }

  // buscar evoluciones por ID
  const getEvolution = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`)
    const data = await response.json()

    let pokemonEvolutionsArray = []

    let pokemonLv1 = data.chain.species.name
    let pokemonLv1Img = await getPokemonImg(pokemonLv1)
    pokemonEvolutionsArray.push([pokemonLv1, pokemonLv1Img])

    if (data.chain.evolves_to.length !== 0) {
      let pokemonLv2 = data.chain.evolves_to[0].species.name
      let pokemonLv2Img = await getPokemonImg(pokemonLv2)
      pokemonEvolutionsArray.push([pokemonLv2, pokemonLv2Img])

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
        let pokemonLv3Img = await getPokemonImg(pokemonLv3)
        pokemonEvolutionsArray.push([pokemonLv3, pokemonLv3Img])
      }
    }
    setpokemonEvolutions(pokemonEvolutionsArray)
  }

  // buscar imagen por nombre
  const getPokemonImg = async (pokeName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    const data = await response.json()
    return data.sprites.other["official-artwork"].front_default // los guiones medios se los escribe de esta forma
  }

  useEffect(() => {
    getEvolution(pokemonId)
  }, [pokemonId])


  return (
    <Container className='main-container'>
      <div className={`cards__container card${pokemonEvolutions.length}`}>
        {
          pokemonEvolutions.map(pokemon =>
            <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />)
        }
      </div>

      <div className='buttons-container'>
        <Button
          icon={<TiArrowLeftOutline />}
          handleClick={decrementar} />
        {/* {pokemonName} */}
        <Button
          icon={<TiArrowRightOutline />}
          handleClick={incrementar} />
      </div>
    </Container>
  )
}

export default App