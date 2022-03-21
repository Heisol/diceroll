import { db } from "../../../localmodules/firebase"
import { collection, addDoc, query, getDocs} from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { v4 as uuidv4} from 'uuid'

import styles from '../../../styles/popup.module.css'

const RollHistory = ({fetching, setFetching, cUser, dice, setDice,diceNum, setDiceNum}:any) => {

    

    const [rolls, setRolls] = useState<any>()
    const [dialog, setDialog] = useState<boolean>(false)
    const onSaveRoll = () =>{
        if (!dice ||! diceNum) return
        setFetching(true)
        addDoc(collection(db, cUser.uid), {
        dateTime: new Date(),
        dice: dice,
        diceNum: diceNum,
        }).then(doc=>{
            const dialogElement = document.getElementById('dialog')
            dialogElement && dialogElement.showModal()
            setFetching(false)
        }).catch(e=>{alert(`Error ${e.code}:${e.message}`)})
    }

    const onGetRoll = () =>{
        setFetching(true)
        getDocs(collection(db, cUser.uid))
        .then( async (res)=>{
          let tempArr = await res.docs.map((e:any)=>{ return e.data()})
          let tempArr2 = tempArr.map(e=>{
            e.dateTime = e.dateTime.toDate()
            return e
          })
          let tempArr3 = tempArr2.sort((a,b)=>a.dateTime>b.dateTime ? -1 : 1)
          let tempArr4 = tempArr3.map(e=>{
            e.dateTime = e.dateTime.toString().split('(')[0]
            return e
          })
          tempArr4 && setRolls(tempArr4)
          const historyTab = document.getElementById('historyTab')
          historyTab && setTimeout(()=>historyTab.showModal(), 1000)
          
        }).catch(e=>alert(`Error ${e.code}: ${e.message}`))
        .finally(()=>setFetching(false))
    }

  return (
    <div className="my-3 btn-group" style={{width: '25%'}}>
          <dialog className={`alert alert-primary`} id='dialog' open={dialog}>
            Saved succesfully  
            <span className={`p-3`} style={{cursor: 'pointer'}} onClick={()=>{
                 const dialogElement = document.getElementById('dialog')
                 dialogElement && dialogElement.close()
            }} > <FontAwesomeIcon icon={faClose}/> </span>
          </dialog>
          <button onClick={onSaveRoll} className='btn btn-primary' disabled={fetching || !cUser || !dice || !diceNum}>Save roll</button>
          <button onClick={onGetRoll} title="Displays the saved dice rolls and the user can load a certain roll" className='btn btn-dark' disabled={fetching || !cUser}>View saved rolls</button>
          {rolls && <History rolls={rolls} setDice={setDice} setDiceNum={setDiceNum} />}
    </div>
  )
}

const History = ({rolls, setDice, setDiceNum}:any) =>{
  return (
      <dialog className={`alert alert-primary`} id='historyTab' >
        <span className="d-flex flex-row-reverse" style={{cursor: 'pointer'}} onClick={()=>{
          const historyTab = document.getElementById('historyTab')
          historyTab && setTimeout(()=>historyTab.close(), 1000)
        }} ><FontAwesomeIcon icon={faClose}/></span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date&#38;Time saved</th>
              <th scope="col">No. of Dices</th>
              <th scope="col" ></th>
            </tr>
          </thead>
          <tbody>
            {rolls.map((e:any)=>{
              console.log(e)
              return (
                <tr key={uuidv4()}>
                  <td>{e.dateTime}</td>
                  <td>{e.diceNum}</td>
                  <td>
                    <button className="btn btn-info" onClick={()=>{
                      setDiceNum(e.diceNum)
                      setDice(e.dice)
                    }}>Load roll</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </dialog>
  )
}

export default RollHistory