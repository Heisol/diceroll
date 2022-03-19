import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faStop} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { type } from 'os'

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
            if (dice) rollDices(diceNum)
          }}
          placeholder="Number of dices"
        />
        <span onClick={()=>rollDices(diceNum)} className="input-group-text btn btn-primary"><FontAwesomeIcon icon={faDice} /></span>
        {/* <span className="input-group-text btn btn-primary"><FontAwesomeIcon icon={faStop} /></span> */}
      </div>
      {
        dice &&
        <div className='d-flex flex-row card p-3'>
          <div className='d-flex flex-column bd-highlight mb-3' style={{width: '15%', flexWrap: 'wrap'}}>
            {
              tempArr.map(e=><div key={uuidv4()}><p className='font-monospace'>{e}: {dice.filter(e1=>e1.value == e ? true: false).length}</p></div>)
            }
          </div>
          <div className='d-flex bd-highlight mb-3 card' style={{width: '85%', flexWrap: 'wrap'}}>
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

const DiceComponent = ({textToRender}:{textToRender:String | number}) =>{
  return(
    <div style={{
      height: 100,
      width: 100,
      minHeight: 100,
      minWidth: 100,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
      }} 
      className='m-3 p-3 border border-primary' key={uuidv4()}>
      <div>{textToRender}</div>
    </div>
  )
}