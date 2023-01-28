export default function PokemonStatBar(props) {
    const statName = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        'special-attack': "SATK", 
        'special-defense': "SDEF",
        speed: "SPD"
    }

    const starbarStyle = {
        backgroundColor: `${props.bgc}`
    }
    const fillbarStyle = {
        width: `${props.statvalue}px`,
        backgroundColor: `${props.bgc}`
    }

    return (
        <div className="poke-basestats">   
            <p style={{color: `${props.bgc}`}}>{statName[props.statname]}</p>
            <p>{props.statvalue}</p>

            <div className="poke-statholder">
                <div className="poke-statbar" style={starbarStyle}>
                </div>
                <div className="poke-fillbar" style={fillbarStyle}>
                </div>
            </div>
        </div>
    )
}