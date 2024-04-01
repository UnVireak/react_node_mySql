
//  import { x } from "../../../ShareData/Data"
import { Button } from 'antd'
import {useState} from "react"
const AboutPage = ()=>{
   const [count, setCount] = useState(0)
   const increse = ()=>{
    setCount(count+1)
   }

   const decrese = ()=>{
    setCount(count-1)
   }
   const reset = ()=>{
   setCount(0)
   }
       return (
        <div>
             <h3>{count}</h3>
            <Button onClick={increse}>+</Button>
            <Button onClick={decrese}>-</Button>
            <Button onClick={reset}>Reset</Button>
           
            <h2>This is AboutPage</h2>
            <h2>This is AboutPage</h2>
            <h2>This is AboutPage</h2>
            <h2>This is AboutPage</h2>
        </div>
    )
}
export default AboutPage;