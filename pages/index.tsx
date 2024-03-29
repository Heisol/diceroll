import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
// package imports

import SettingsBar from './pages-components/index/SettingsBar';
import DiceComponent from './pages-components/index/DiceComponent';
import UserBar from './pages-components/index/UserBar';
import RollHistory from './pages-components/index/RollHistory'
//local imports

import {app, db} from '../localmodules/firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
//firebase

const Home: NextPage = () => {

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
  useEffect(()=>{
    document.title = 'Dice Roller'
  },[])

  const [diceNum, setDiceNum]= useState<any>(1)
  const [dice, setDice] = useState<Array<dice>>()
  const [diceRange, setDiceRange] = useState<number | undefined>()

  const rollDice = ():number =>Math.floor(Math.random()*(diceRange || 6))+1
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

 const [exactRes, setExactRes] = useState<number|undefined>()
 const [rangeRes, setRangeRes] = useState<{range: Array<number>, values: Array<number>, log:string, total:number}| undefined>()
 // in res in searchSettingsBar
 const [otpModal, setOTPModal] = useState<boolean>(false)
 const [otpField, setOTPField] = useState<any>(null)
 const [qr, setQR] = useState<any>(null)
 const [signedIn, setSignedIn] = useState<boolean>(false)
 const [user, setUser] = useState<any>(null)
 const [cUser, setCUser] = useState<any>(null)
 const [fetching, setFetching] = useState<boolean>(false)
 const [res, setRes] = useState<any>()
 const signIn = () =>{
  setFetching(true)
  signInWithPopup(auth, provider)
  .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential && credential.accessToken;
      // The signed-in user info.
      const user = result.user
      setUser(result.user)
      setFetching(false)
      setSignedIn(true)
      setCUser(user)
  }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      setFetching(false)
  });
  }

  const signOutClick = () =>{
    setFetching(true)
    signOut(auth).then(()=>{
      setFetching(false)
      setUser({photoUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'})
      setSignedIn(false)
      setCUser(null)
    }).catch(e=>{
      setFetching(false)
    })
  }

 // user bar
  return (
    <div className="container my-3">
      <UserBar signIn={signIn} signOut={signOutClick} signedIn={signedIn} user={user} fetching={fetching} />
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
        <input
          style={{width:'10'}}
          type="number"
          className="form-control"
          value={diceRange}
          onChange={(e:any)=>{
            if (Number(e.target.value) <= 0) return
            setDiceRange(e.target.value)
          }}
          placeholder="Maximum dice roll (minimum 1, default value is 6)"
          title='Highest possible roll (Minimum of 1)'
        />
      </div>
      {cUser && <RollHistory 
        fetching={fetching}
        setFetching={setFetching}
        cUser={cUser}
        dice={dice}
        setDice={setDice}
        diceNum={diceNum}
        setDiceNum={setDiceNum}
        />}
      <SettingsBar dice={dice || undefined} rangeRes={rangeRes} setRangeRes={setRangeRes} exactRes={exactRes} setExactRes={setExactRes} />
      {
        dice &&
        <div className='d-flex flex-row card p-3'>
          <div className='d-flex flex-row bd-highlight p-3 card' style={{width: '100%', flexWrap: 'wrap'}}>
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

