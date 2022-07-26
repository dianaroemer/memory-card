import React from "react";
import './Styling/Card.css'

function Card(props){



    return(
        <div className="cardSlot" onClick={e=> props.handleClickTile(e, props.card)}>
            <h3>
                I am an individual card. Here are my details:
            </h3>
            <h2>
                {props.card.name}
            </h2>
        </div>
    );

}

export default Card;