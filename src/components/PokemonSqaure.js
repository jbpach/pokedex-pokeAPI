import { useEffect, useState } from "react"

export default function PokemonSquare(props) {

    
    const backgroundStyle = {
        normal: "#AAA67F",
        fighting: "#C12239",
        flying: "#A891EC",
        poison: "#A43E9E",
        ground: "#DEC16B", 
        rock: "#B69E31",
        bug: "#A7B723",
        ghost: "#70559B",
        steel: "#B7B9D0",
        fire: "#F57D31",
        water: "#6493EB",
        grass: "#74CB48",
        electric: "#F9CF30",
        psychic: "#FB5584",
        ice: "#9AD6DF",
        dragon: "#7037FF",
        dark: "#75574C",
        fairy: "#E69EAC"
    }

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
            const fetchData = async () => {
                const data = await fetch(props.url)
                const json = await data.json()  
                setPokemon(json)
            }
            fetchData()      
    }, [props.url])

    const divbgc = {
        backgroundColor: pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "transparent"
    }
    const h1c = {
        color: pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "transparent"
    }



    console.log(props)
    console.log(pokemon)

    return (
        <div className="poke-squareframe" style={divbgc}>
            <div className="poke-sqaure">
                <h1 style={h1c}>{`#${pokemon.id}`}</h1>
                {pokemon.sprites && <img src={pokemon.sprites.other["official-artwork"].front_default} alt="official-artwork" /> }
            </div>
            <h1>{pokemon.name}</h1>
        </div>
    )
}