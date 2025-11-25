import { useState,useEffect } from "react"
import {nanoid} from "nanoid"
import Die from "./Die"

export default function App() {
    /**
     * Challenge: Update the array of numbers in state to be
     * an array of objects instead. Each object should look like:
     * { value: <random number>, isHeld: false }
     * 
     * Making this change will break parts of our code, so make
     * sure to update things so we're back to a working state
     */
    
    const [dice, setDice] = useState(generateAllNewDice())
    const [rollCount,setRollCount] = useState(0);
    useEffect(()=>{
        checkWin();
    },[dice])
    
    function generateAllNewDice() {
        const arr = []
        for(let i=0;i<10;i++){
            arr.push({
                value:Math.floor(Math.random()*6),
                isHeld:false,
                id:nanoid()
            })
        
        }
        return arr;
    }
    
    function holdDice(id){
        setDice(prevDice => 
            prevDice.map(die=>die.id === id ? {...die,isHeld:!die.isHeld} : die)
        )
    }
    
    function checkWin(){
        const heldDice = dice.filter(die=>die.isHeld)
        const allHeld = heldDice.length === dice.length;
        const allSameValue = allHeld && heldDice.every(die=>die.value === heldDice[0].value)
        
        if(allSameValue){
            return true;
            setRollCount(0);
        }
        else{
            return false;
        }
        
    }
    
    function rollDice() {
        setRollCount(prev=>prev+1);
        const check = checkWin();
        !check ?
        setDice(prev=>prev.map(die=>die.isHeld ? die : {...die,value:Math.floor(Math.random()*6)}))
        :
        setDice(generateAllNewDice())
    }
    
    const diceElements = dice.map(num => <Die checkWin={checkWin} holdDice={holdDice} key={num.id} isHeld={num.isHeld} id={num.id} value={num.value} />)
    
    return (
        <main>
            {checkWin() ? <div> YOU WON!!!<br/>Roll Count: {rollCount}</div> : null}
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{!checkWin() ? "Roll" : "Play Again"}</button>
        </main>
    )
}