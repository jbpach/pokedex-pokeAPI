import { useState, useEffect } from "react"
import PokemonCard from "./components/PokemonCard"
import PokemonSquare from "./components/PokemonSqaure"

import { IconContext } from "react-icons/lib"
import { MdCatchingPokemon, MdOutlineArrowBack } from "react-icons/md"


import "./App.css"

export default function App() {
    const [pokemonArr, setPokemonArr] = useState([])
    const [renderCard, setRenderCard] = useState(false)
    const [squareClicked, setSquareClicked] = useState(0)
    const [search, setSearch] = useState("")
    const [searchArr, setSearchArr] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            const json = await data.json()
            setPokemonArr(json.results)
        }
        fetchAllData()
            .catch(console.error)
    }, [])

    function pokeSquareClick(id) {
        if (id === 0) {
            setRenderCard(false)
            setSquareClicked(0)
        }
        else {
            setRenderCard(true)
            setSquareClicked(id)
        }
    }

    function handleChange(event) {
        const {value} = event.target
        setSearch( value.toLowerCase() )
        if (value) {
            const resultsArray = pokemonArr.filter(pokemon => pokemon.name.includes(value))
            setSearchArr(resultsArray)
        }
        else {
            setSearchArr([])
        }
    }

    const arrToMap = searchArr.length === 0 ? pokemonArr : searchArr

    const pokemonArrElm = arrToMap.map((pokemon) => {
        return (
            <PokemonSquare clicked={pokeSquareClick} key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        )
    }) 

    return (
        <>  
            <main>
            { !renderCard ?
                <>
                <nav>
                    <IconContext.Provider value={{size: "2em"}}>
                        <MdCatchingPokemon />
                    </IconContext.Provider>

                    <h1>Pokédex</h1>
                    <input 
                        type="search" 
                        placeholder="Search"    
                        name="search"
                        value={search}
                        onChange={handleChange}
                    />
                </nav>


                <div className="poke-maingrid">
                    {pokemonArrElm}
                </div>

                </>
                :
                <div className="main">
                    <div className="poke-goback">
                        <button className="poke-nextButton" onClick={() => {pokeSquareClick(0)}}>
                            <IconContext.Provider value={{size: "2.5em"}}>
                                <MdOutlineArrowBack />
                            </IconContext.Provider>
                        </button>
                    </div>
                    <PokemonCard 
                        id={squareClicked}
                    />
                </div>
            }
            </main>
        </>
    )
}