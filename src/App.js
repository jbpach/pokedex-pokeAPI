import { useState, useEffect } from "react"
import PokemonCard from "./components/PokemonCard"
import "./App.css"
import PokemonSquare from "./components/PokemonSqaure"

export default function App() {
    const [counter, setCounter] = useState(1)

    const [pokemon, setPokemon] = useState({})

    const [pokemonArr, setPokemonArr] = useState([])

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
        const fetchAllData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            const json = await data.json()
            setPokemonArr(json.results)
        }
        fetchAllData()
            .catch(console.error)
    }, [])

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

    const pokemonArrElm = pokemonArr.map((pokemon) => {
        return (
            <PokemonSquare name={pokemon.name} url={pokemon.url} />
        )
    }) 

    return (
        <div>
            {/* <PokemonSquare name={pokemonArr[0] && pokemonArr[0].name} url={pokemonArr[0] && pokemonArr[0].url} /> */}
            {pokemonArrElm}
        </div>
        // <div className="main">
        //     <PokemonCard 

        //         name={pokemon.name}
        //         id={pokemon.id}

        //         img={pokemon.sprites}

        //         typesArr={pokemon.types}

        //         weight={pokemon.weight}
        //         height={pokemon.height}
        //         abilitiesArr={pokemon.abilities}

        //         statsArr={pokemon.stats}
        //     />
            
        //     {pokemon.id > 1 && <button onClick={handlePrevPokemon}>Prev Pokemon</button>}
        //     <button onClick={handleNextPokemon}>Next pokemon</button>
        // </div>
    )
}