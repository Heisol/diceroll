import type { NextPage } from 'next'
import { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
// package imports

import SettingsBar from './pages-components/index/SettingsBar';
import DiceComponent from './pages-components/index/DiceComponent';
//local imports

import {app, db} from '../localmodules/firebase';
//firebase import from local config

const Home: NextPage = () => {

  interface Body {
    test: string
  }

  const [test,setTest] = useState<{item: String, test: Boolean}>({item: '', test: false})

  return (
    <ReactPage/>
  )
}

export default Home

const ReactPage = ()=>{
  interface dice {
    index: number,
    value: number
  }

  const [diceNum, setDiceNum]= useState<any>(1)
  const [dice, setDice] = useState<Array<dice>>()

  const rollDice = ():number =>Math.floor(Math.random()*6)+1
  // rolling func
  const rollDices = (dices:number) =>{
    if (dices<=0) {
      alert('There should be at least 1 dice to roll')
    }
    let diceArr:Array<dice>= []
    for (let i = 0; i < dices; i++) {
      diceArr.push({index: i+1, value: rollDice()})
    }
    setDice(diceArr)
  }
 // actual dice rolling

  let tempArr = [1,2,3,4,5,6]

  return (
    <div className="container my-3">
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          value={diceNum}
          onChange={e=>{
            if (Number(e.target.value) <= 0) return
            setDiceNum(e.target.value)
          }}
          placeholder="Number of dices"
        />
        <span onClick={()=>rollDices(diceNum)} className="input-group-text btn btn-primary"><FontAwesomeIcon icon={faDice} /></span>
      </div>
      <SettingsBar dice={dice || undefined}/>
      {
        dice &&
        <div className='d-flex flex-row card p-3'>
          <div className='d-flex flex-column bd-highlight mb-3' style={{width: '15%', flexWrap: 'wrap'}}>
            
          </div>
          <div className='d-flex flex-row bd-highlight p-3 card' style={{width: '80%', flexWrap: 'wrap'}}>
            {
              dice &&dice.map(e=>{
                return (
                  <DiceComponent key={uuidv4()} textToRender={e.value}/>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

