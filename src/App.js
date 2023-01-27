import { useState, useEffect } from "react"
import PokemonCard from "./components/PokemonCard"
import "./App.css"

export default function App() {
    const [counter, setCounter] = useState(1)

    const [pokemon, setPokemon] = useState({})

    // useEffect(() => {
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
    //         .then(res => res.json())
    //         .then(data => setPokemon(() => {
    //             return (
                    // {
                    //     abilities: data.abilities,
                    //     base_experience: data.base_experience,
                    //     height: data.height,
                    //     weight: data.weight,
                    //     id: data.id,
                    //     name: data.name,
                    //     species: data.species,
                    //     sprites: data.sprites["other"]["official-artwork"]["front_default"],
                    //     stats: data.stats,
                    //     types: data.types
                    // }
    //             )
    //         }))
    // }, [counter]) 

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
            const json = await data.json()  
            setPokemon(json)
        }
        fetchData()
            .catch(console.error)
    }, [counter])

    function handlePrevPokemon() {
        setCounter((prev) => {
            return prev - 1
        })
    }
    
    function handleNextPokemon() {
        setCounter((prev) => {
            return prev + 1
        })
    }

    return (
        <div className="main">
            <PokemonCard 

                name={pokemon.name}
                id={pokemon.id}

                img={pokemon.sprites}

                typesArr={pokemon.types}

                weight={pokemon.weight}
                height={pokemon.height}
                abilitiesArr={pokemon.abilities}

                statsArr={pokemon.stats}
            />
            
            {pokemon.id > 1 && <button onClick={handlePrevPokemon}>Prev Pokemon</button>}
            <button onClick={handleNextPokemon}>Next pokemon</button>
        </div>
    )
}