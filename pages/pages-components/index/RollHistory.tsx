import { db } from "../../../localmodules/firebase"
import { collection, addDoc, query, getDocs} from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { v4 as uuidv4} from 'uuid'
import { Drawer, Dialog } from '@mantine/core'

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
            setDialog(true)
            setTimeout(()=>setDialog(false), 5000)
            setFetching(false)
        }).catch(e=>{alert(`Error ${e.code}:${e.message}`)})
    }

    const [historyDialog, setHistoryDialog] = useState<boolean>(false)
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
          setHistoryDialog(true)          
        }).catch(e=>alert(`Error ${e.code}: ${e.message}`))
        .finally(()=>setFetching(false))
    }

  return (
    <div className="my-3 btn-group" style={{width: '25%'}}>
          <Dialog  opened={dialog} withCloseButton onClose={()=>setDialog(false)} >
            Saved succesfully  
          </Dialog>
          <button onClick={onSaveRoll} className='btn btn-primary' disabled={fetching || !cUser || !dice || !diceNum}>Save roll</button>
          <button onClick={onGetRoll} title="Displays the saved dice rolls and the user can load a certain roll" className='btn btn-dark' disabled={fetching || !cUser}>View saved rolls</button>
          {rolls && <History rolls={rolls} setDice={setDice} setDiceNum={setDiceNum} historyDialog={historyDialog} setHistoryDialog={setHistoryDialog} />}
    </div>
  )
}

const History = ({rolls, setDice, setDiceNum, historyDialog, setHistoryDialog}:any) =>{
  return (
      <Drawer opened={historyDialog} onClose={()=>setHistoryDialog(false)}  size='xl' padding={'xl'} position='right' >
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
      </Drawer>
  )
}

export default RollHistory