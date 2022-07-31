import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react'
import uniqid from 'uniqid';

import Card from './Components/Card.js'
import wishSymbols from './Media/wishSymbols.png'
import { click } from '@testing-library/user-event/dist/click';

const staticDeck = [
  {name: 'C1', img: 'wishSymbols', key: uniqid()},
  {name: 'C2', img: '', key: uniqid()},
  {name: 'C3', img: '', key: uniqid()},
  {name: 'C4', img: '', key: uniqid()},
  {name: 'C5', img: '', key: uniqid()},
  {name: 'C6', img: '', key: uniqid()},
  {name: 'C7', img: '', key: uniqid()},
  {name: 'C8', img: '', key: uniqid()},
  {name: 'C9', img: '', key: uniqid()},
  {name: 'C10', img: '', key: uniqid()},
  {name: 'C11', img: '', key: uniqid()},
  {name: 'C12', img: '', key: uniqid()},
  {name: 'C13', img: '', key: uniqid()},
  {name: 'C14', img: '', key: uniqid()},
  {name: 'C15', img: '', key: uniqid()},
  {name: 'C16', img: '', key: uniqid()},
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
  const [highScore, setHighScore] = useState(0);

  const [ clickedArray, setClickedArray ] = useState([]);

  function handleClickTile(e, targetObject){
    e.preventDefault()

    // console.log(`You've reached handleClickTitle, targeting: `, targetObject)
    
    if(clickedArray.includes(targetObject)){
        // console.log(`clickedArray includes ^targetObject^, resetting clickedArray to []`)
        //reset clickedArray
        setClickedArray([]);
        setScore(0);
        //shuffle deck
        randomizeDeck();
        return;
    } 
    // console.log(`clickedArray DOES NOT include ^targetObject^, appending object to clicked array`)
    setClickedArray(clickedArray.concat(targetObject));
    // console.log(clickedArray);
    setScore( s => s + 1);
    randomizeDeck()
  }

  useEffect(() => {
    // console.log(score);
    // console.log(clickedArray);
    if(score > highScore){
      setHighScore(score);
    }
  }, [score])
  
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
        handleClickTile={handleClickTile}
        wishSymbols={wishSymbols}/>
    )
  })

  return (
    <div className="App">
      <div className='Content'>
        <div className='titleContent'>
          <h1>
            Don't click the same card twice
          </h1>
          <h3>
            Can you click all 16 symbols?
          </h3>
        </div>
        <img src={wishSymbols} height={'400px'}/>
        
        <div className='scorePane'>
          <h3>
            High Score: {highScore} 
            {'\n'}
            Current Score: {score}
          </h3>
        </div>
        
        <div className='cardContainer'>
          {cardArr}
        </div>
      </div>
    </div>
  );
}

export default App;