import { v4 as uuidv4 } from "uuid"

// dice component
const DiceComponent = ({textToRender}:{textToRender:String | number}) =>{
    return(
        <div style={{
        height: 50,
        width: 50,
        minHeight: 50,
        minWidth: 50,
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