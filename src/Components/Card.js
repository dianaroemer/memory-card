import React from "react";
import './Styling/Card.css'

function Card(props){



    return(
        <div className="cardSlot" onClick={e=> props.handleClickTile(e, props.card)}>
            <h3>
                {/* I am a card.  */}
            </h3>
            <h2>
                {props.card.name}
            </h2>
            <div className="imgContainer">
                <img src={props.wishSymbols} className='wishSymbol' id={props.card.name}/>
            </div>
            
        </div>
    );

}

export default Card;