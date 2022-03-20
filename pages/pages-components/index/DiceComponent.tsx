import { v4 as uuidv4 } from "uuid"

// dice component
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

export default DiceComponent