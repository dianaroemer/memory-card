import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react'
import uniqid from 'uniqid';

import Card from './Components/Card.js'

const staticDeck = [
  {name: 'C1', img: '', key: uniqid()},
  {name: 'C2', img: '', key: uniqid()},
  {name: 'C3', img: '', key: uniqid()},
  {name: 'C4', img: '', key: uniqid()},
  {name: 'C5', img: '', key: uniqid()},
  {name: 'C6', img: '', key: uniqid()},
];

function App() {

    //function uses staticDeck to return a new array made up of the items in staticDeck in a random order
  function getRandomDeck(){
      
    let randomizedDeck = [];
    let tempStaticDeck = [...staticDeck]
    
    while(tempStaticDeck.length > 0) {
        
        //Math.floor(Math.random() * max 
        // This line uses splice to remove one single value from tempStaticDeck, changing the array in the process so that the looped calls operate on a consecutively smaller and smaller array.
        let removedValue = tempStaticDeck.splice(Math.floor(Math.random() * tempStaticDeck.length-1), 1);
        randomizedDeck = randomizedDeck.concat(removedValue);
    }
    
    // console.log('randomizedDeck')
    // console.log(randomizedDeck)
    // console.log('tempStaticDeck')
    // console.log(tempStaticDeck)
    
    return randomizedDeck;
  }

  const [score, setScore] = useState(0);

  function handleScore(e, operation) {
    if( operation === "add" ){
      setScore((s) => s + 1);
      return;
    } else if ( operation === "reset") {
      setScore( 0 );
      return;
    }
  }



  const [ clickedArray, setClickedArray ] = useState([]);

  function handleClickTile(e, targetObject){
    e.preventDefault()

    console.log(`You've reached handleClickTitle, targeting: `, targetObject)
    
    if(clickedArray.includes(targetObject)){
        console.log(`clickedArray includes ^targetObject^, resetting clickedArray to []`)
        //reset clickedArray
        setClickedArray([]);
        setScore(0);
        //shuffle deck
        randomizeDeck();
        return;
    } 
    console.log(`clickedArray DOES NOT include ^targetObject^, appending object to clicked array`)
    setClickedArray(clickedArray.concat(targetObject));
    console.log(clickedArray);
    setScore( s => s + 1);
    randomizeDeck()
  }
  
  const [deck, setDeck] = useState(getRandomDeck());

  function randomizeDeck() {
    setDeck(getRandomDeck());
  }


  let cardArr = [];
  deck.forEach(element => {
    cardArr.push(
      <Card card={element}
        name={element.name}
        key={element.key}
        handleClickTile={handleClickTile}/>
    )
  })

  return (
    <div className="App">
      <div className='Content'>
        <h1>
          what's happening my dudes.
        </h1>
        <h2>
          The current score is: {score}
        </h2>
        <div className='cardContainer'>
          {cardArr}
        </div>
      </div>
    </div>
  );
}

export default App;