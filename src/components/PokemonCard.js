import { IconContext } from "react-icons/lib";
import { FaRulerVertical } from "react-icons/fa"
import { GiWeight } from "react-icons/gi"
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="poke-frame" style={{backgroundColor: props.typesArr ? backgroundStyle[props.typesArr[0].type.name] : "transparent" }}>
            
            <div className="poke-heading">
                <h1>{props.name && capitalizeFirstLetter(props.name)}</h1>
                <h2>{`#${props.id}`}</h2>
            </div>

            {props.img && 
                <img className="poke-img" src={props.img.other["official-artwork"].front_default} alt="official-artwork" />
            }

            <div className="poke-card">
                <ul className="poke-ul">
                    {props.typesArr &&
                        props.typesArr.map((type) => {
                            return (
                                <li className="poke-type" style={{backgroundColor: props.typesArr ? backgroundStyle[type.type.name] : "transparent"}} key={type.slot}>{ type.type.name && capitalizeFirstLetter(type.type.name) }</li>
                            )
                        })
                    }
                </ul>

                <h3 className="poke-subtitle" style={{color: props.typesArr ? backgroundStyle[props.typesArr[0].type.name] : "transparent" }}>About</h3>

                <div className="poke-mainstats"> 
                    <div className="poke-mainstats-flex">
                        <div>
                            <IconContext.Provider value={{color: "#212121", size: "1.2em"}}>
                                <GiWeight />
                            </IconContext.Provider>
                            <span>{`${props.weight / 10} kg`}</span>
                        </div>
                        <p>Weight</p>
                    </div>
                    <div className="poke-mainstats-flex">
                        <div>
                            <IconContext.Provider value={{color: "#212121", size: "1.2em"}}>
                                <FaRulerVertical />
                            </IconContext.Provider>
                            <span>{`${props.height / 10} m`}</span>
                        </div>
                        <p>Height</p>
                    </div>
                    
                    <ul className="ability-list" style={{marginLeft: "24px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {props.abilitiesArr &&
                            props.abilitiesArr.map((ability) => {
                                return (
                                    <li key={ability.slot}>{ ability.ability.name && capitalizeFirstLetter(ability.ability.name) }</li>
                                )
                            })
                        }
                        <li>Moves</li>
                    </ul>
                </div>

                <h3 className="poke-subtitle" style={{color: props.typesArr ? backgroundStyle[props.typesArr[0].type.name] : "transparent" }}>Base Stats</h3>

                <div>
                    <ul>
                        {props.statsArr && 
                            props.statsArr.map((stat) => {
                                return (
                                    <li key={stat.stat.name}> <PokemonStatBar bgc={props.typesArr ? backgroundStyle[props.typesArr[0].type.name] : "transparent"} statname={stat.stat.name} statvalue={stat.base_stat}/></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}