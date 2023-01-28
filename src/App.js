import { useState, useEffect } from "react"
import PokemonCard from "./components/PokemonCard"
import PokemonSquare from "./components/PokemonSqaure"
import "./App.css"

export default function App() {
    const [pokemonArr, setPokemonArr] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            const json = await data.json()
            setPokemonArr(json.results)
        }
        fetchAllData()
            .catch(console.error)
    }, [])

    const [renderCard, setRenderCard] = useState(false)
    const [squareClicked, setSquareClicked] = useState(0)

    function pokeSquareClick(id) {
        setRenderCard(true)
        setSquareClicked(id)
    }

    function returnBack() {
        setRenderCard(false)
        setSquareClicked(0)
    }

    const pokemonArrElm = pokemonArr.map((pokemon) => {
        return (
            <PokemonSquare clicked={pokeSquareClick} key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        )
    }) 

    return (
        <>
            <main>
            { !renderCard ?
                <div className="poke-maingrid">
                    {pokemonArrElm}
                </div>
                :
                <div className="main">
                    <PokemonCard 
                        id={squareClicked}
                    />
                    <button onClick={returnBack}>Go Back</button>
                </div>
            }
            </main>
        </>
    )
}