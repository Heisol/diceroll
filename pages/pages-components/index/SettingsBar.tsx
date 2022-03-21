import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import {v4 as uuidv4} from 'uuid'

const SettingsBar = ({dice, rangeRes, setRangeRes, exactRes, setExactRes}:any) => {
  const [outputType, setOutputType] = useState<Array<boolean>>([true, false])
  const [exactSearch, setExactSearch] = useState<string>()

  const searchForExact = (dice:any, searchVal:number):number|undefined =>{
    if (!dice) return
    let exactArr = dice.filter((e:any)=>e.value == searchVal ? true: false)
    setExactRes(exactArr.length)
  }
  const [rangeSearch, setRangeSearch] = useState<string>('')
  const [validRange, setValidRange] = useState<boolean>(false)
  
  const rangeSearchOnChange = (inputString:string) =>{
    let tempString = inputString.trim()
    let tempSplit = tempString.includes('-') ? tempString.split('-') : null
    if (tempSplit) {
      let leftVal = tempSplit[0].replace(/\D/g, "")
      let rightVal = tempSplit[1].replace(/\D/g, "")
      let newString = leftVal+'-'+rightVal
      setRangeSearch(newString)
      setValidRange((!leftVal || !rightVal)? false : true)
      return
    }
    setValidRange(false)
    setRangeSearch(tempString)
  }
  const searchForRange = () =>{
    if (!rangeSearch || !validRange) return
    setRangeRes(undefined)
    let temp:any = rangeSearch.split('-')
    let min = temp[0] == temp[1] ? null : temp[0] < temp[1] ? 1 : temp[0] > temp[1] && 2
    if (!min) {
      setRangeRes({range: [1], values: [1], log:'Are you looking for an exact value? Use exact search instead', total: 0})
      return
    }
    let range = min == 1 ? temp[1]-temp[0]: temp[0]-temp[1]
    let rangeArr:Array<number> = []
    let valArr:Array<number> = []
    let total:number = 0
    for (let i = 0; i < range+1; i++) {
      rangeArr.push(min == 1 ? Number(temp[0])+i : Number(temp[1])+i)
    }
    for (let i = 0; i < rangeArr.length; i++) {
      valArr[i] = dice.filter((e:any)=>e.value == rangeArr[i] ? true: false).length
      total = total + valArr[i]
    }
    setRangeRes({range: rangeArr, values: valArr, log: '', total: total})
  }
  

  
  return (
    <div className="card my-3 p-3">
        <div className="d-flex flex-row">
          <div className="form-check p-3 mx-3">
            <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={outputType[0]} onChange={()=>setOutputType(outputType.map(e=>!e))}
            />
            <label className="form-check-label">
              Get exact
            </label>
          </div>
          <div className="form-check p-3">
            <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={outputType[1]} onChange={()=>setOutputType(outputType.map(e=>!e))}
            />
            <label className="form-check-label">
              Get from range
            </label>
          </div>
        </div>
        <div className="card mx-3 p-3">
          {
            outputType[0] 
            ? <div style={{width: '25vw'}}>
              <div className="input-group mb-3">
                <input type="number" value={exactSearch} onChange={e=>setExactSearch(e.target.value)} className="form-control" placeholder="Exact value to find"/>
                <button onClick={()=>searchForExact(dice, typeof exactSearch !== 'number' ? Number(exactSearch): exactSearch)} className="input-group-text btn btn-primary" disabled={!dice || !exactSearch? true : false}><FontAwesomeIcon icon={faSearch}/></button>
              </div>
              {exactRes == 0 ? 'No results found' : exactRes && <p>There {exactRes>1? 'are': 'is'} <span className="text-primary">{exactRes}</span> found in this roll.</p>}
            </div>
            : <div style={{width: '25vw'}}>
              <div className="input-group mb-3">
                <input type="text" value={rangeSearch} onChange={e=>rangeSearchOnChange(e.target.value)} className="form-control" placeholder="Range of values"/>
                <button onClick={()=>searchForRange()} className="input-group-text btn btn-primary" disabled={!dice || !validRange}><FontAwesomeIcon icon={faSearch}/></button>
              </div>
              {(rangeRes && rangeRes.log) ? <p className="text-warning" >{rangeRes.log}</p>
              : (rangeRes && rangeRes.total !== 0) && <>
              <p>Found <span className="text-primary">{rangeRes.total}</span> results on this roll</p>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-controls="flush-collapseOne">
                    See details
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    {rangeRes && rangeRes.range.map((e:any)=>{
                      let index = rangeRes.range.indexOf(e)
                      if (rangeRes.values[index] !== 0) {return (
                        <div key={uuidv4()}>{e} &#58; {rangeRes.values[index]}</div>
                      )}
                    })}
                  </div>
                </div>
              </div>
              </>}
              {(rangeRes && rangeRes.total == 0) && <p>No Results found</p> }
              <p className="card-text text-muted">Use 2 numbers and put a &#45; to indicate a range of values	&#40;Example 1&#45;2	&#41;.</p>
            </div>
          }
        </div>
    </div>
  )
}

export default SettingsBar