import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react'
import uniqid from 'uniqid';

import Navbar from './Components/Navbar.js';
import Card from './Components/Card.js'
import wishSymbols from './Media/wishSymbols.png'
import { click } from '@testing-library/user-event/dist/click';

const staticDeck = [
  {name: 'C1', img: 'wishSymbols', key: uniqid(), title: 'Down Bird'},
  {name: 'C2', img: '', key: uniqid(), title: 'Sitting Bird'},
  {name: 'C3', img: '', key: uniqid(), title: 'Up Bird'},
  {name: 'C4', img: '', key: uniqid(), title: 'Standing Bird'},
  {name: 'C5', img: '', key: uniqid(), title: 'Seaweed Fish'},
  {name: 'C6', img: '', key: uniqid(), title: 'Down Fish'},
  {name: 'C7', img: '', key: uniqid(), title: 'Sixty-Nine Fish'},
  {name: 'C8', img: '', key: uniqid(), title: 'Up Fish'},
  {name: 'C9', img: '', key: uniqid(), title: 'Infinity Snake'},
  {name: 'C10', img: '', key: uniqid(), title: 'Eight Snake'},
  {name: 'C11', img: '', key: uniqid(), title: 'Down Snake'},
  {name: 'C12', img: '', key: uniqid(), title: 'Cloud Snake'},
  {name: 'C13', img: '', key: uniqid(), title: 'Left Fire'},
  {name: 'C14', img: '', key: uniqid(), title: 'Right Fire'},
  {name: 'C15', img: '', key: uniqid(), title: 'Right Spear'},
  {name: 'C16', img: '', key: uniqid(), title: 'Left Spear'},
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

  // This useEffect handles updating highScore whenever score is changed. This function is run as a useEffect instead of in handleClickTile to avoid async issues when score updates, but could also easily be handled inside handleClickTile by using ((score+1) > highScore) and setHighScore(score+1), but this is literally what useEffect was made for, so then there's that.
  useEffect(() => {
    // console.log(score);
    // console.log(clickedArray);
    if(score > highScore){
      setHighScore(score);
    }
  }, [score, highScore])
  
  const [deck, setDeck] = useState(getRandomDeck());

  function randomizeDeck() {
    setDeck(getRandomDeck());
  }

  const [spoiler, setSpoiler] = useState(false);

  function handleSpoiler(e) {
    e.preventDefault();
    setSpoiler(!spoiler);
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
    <div className="App" style={{backgroundColor: 'bisque'}}>
      <Navbar/>
      <div className='Content'>
      <div className='scorePane'>
          <h3>
            High Score: {highScore} 
            {'\n'}
            Current Score: {score}
          </h3>
        </div>

        <div className='titleContent'>
          <h1>
            Don't click the same card twice
          </h1>
          <h3>
            Can you click all 16 symbols?
          </h3>
        </div>
        {spoiler 
        ? <img 
            src={wishSymbols} 
            height={'400px'} 
            alt='A Spoiler showing all of the symbols from the wishing wall in a 4x4 grid.'
            onClick={e=> handleSpoiler(e)}/> 
        : <h3 className='spoilerText' onClick={e => handleSpoiler(e)}>Click me to show the cheat sheet</h3>
        }

        
        <div className='cardContainer'>
          {cardArr}
        </div>
      </div>
    </div>
  );
}

export default App;