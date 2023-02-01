import { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import { FaRulerVertical } from "react-icons/fa"
import { GiWeight } from "react-icons/gi"
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import PokemonStatBar from "./PokemonStatBar"

export default function PokemonCard(props) {
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

    const [pokemonid, setPokemonId] = useState(props.id)
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonid}`)
            const json = await data.json()  
            setPokemon(json)
        }
        fetchData()
            .catch(console.error)
    }, [pokemonid])


    function handlePrevPokemon() {
        if(pokemonid > 1) {
            setPokemonId((prev) => {
                return prev - 1
            })
        }
    }
    
    function handleNextPokemon() {
        if(pokemonid < 151) {
            setPokemonId((prev) => {
                return prev + 1
            })
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="poke-frame" style={{backgroundColor: pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "transparent" }}>
                
                <div className="poke-heading">
                    <h1>{pokemon.name && capitalizeFirstLetter(pokemon.name)}</h1>
                    <h2>{pokemon.id && `#${pokemon.id}`}</h2>
                </div>

                {pokemon.sprites && 
                    <img className="poke-img" src={pokemon.sprites.other["official-artwork"].front_default} alt="official-artwork" />
                }

                <div className="poke-card">
                    <ul className="poke-ul">
                        {pokemon.types &&
                            pokemon.types.map((type) => {
                                return (
                                    <li className="poke-type" style={{backgroundColor: pokemon.types ? backgroundStyle[type.type.name] : "black"}} key={type.slot}>{ type.type.name && capitalizeFirstLetter(type.type.name) }</li>
                                )
                            })
                        }
                    </ul>
    
                    <h3 className="poke-subtitle" style={{color: pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "black" }}>About</h3>

                    <div className="poke-mainstats"> 
                        <div className="poke-mainstats-flex">
                            <div>
                                <IconContext.Provider value={{color: "#212121", size: "1.2em"}}>
                                    <GiWeight />
                                </IconContext.Provider>
                                <span>{pokemon.weight &&`${pokemon.weight / 10} kg`}</span>
                            </div>
                            <p>Weight</p>
                        </div>
                        <div className="poke-mainstats-flex">
                            <div>
                                <IconContext.Provider value={{color: "#212121", size: "1.2em"}}>
                                    <FaRulerVertical />
                                </IconContext.Provider>
                                <span>{pokemon.height && `${pokemon.height / 10} m`}</span>
                            </div>
                            <p>Height</p>
                        </div>
                        
                        <ul className="ability-list" style={{marginLeft: "24px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            {pokemon.abilities &&
                                pokemon.abilities.map((ability) => {
                                    return (
                                        <li key={ability.slot}>{ ability.ability.name && capitalizeFirstLetter(ability.ability.name) }</li>
                                    )
                                })
                            }
                            <li>Moves</li>
                        </ul>
                    </div>

                    <h3 className="poke-subtitle" style={{color: pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "black" }}>Base Stats</h3>

                    <div>
                        <ul>
                            {pokemon.stats && 
                                pokemon.stats.map((stat) => {
                                    return (
                                        <li key={stat.stat.name}> <PokemonStatBar bgc={pokemon.types ? backgroundStyle[pokemon.types[0].type.name] : "black"} statname={stat.stat.name} statvalue={stat.base_stat}/></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="poke-buttons">
                {pokemonid > 1 &&<button className="poke-nextButton" onClick={handlePrevPokemon}>
                    <IconContext.Provider value={{size: "2em"}}>
                        <MdOutlineArrowBackIos />
                    </IconContext.Provider>
                </button>}
            </div>
            <div className="poke-buttons-r">
                {pokemonid < 151 && <button className="poke-nextButton" onClick={handleNextPokemon}>
                    <IconContext.Provider value={{size: "2em"}}>
                        <MdOutlineArrowForwardIos />
                    </IconContext.Provider>
                </button>}
            </div>
        </>
    )
}