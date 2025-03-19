import React , {useState} from 'react'
import './Calculator.scss'
import Button from './Button'

const Calculator = () => {

    const [exp, setExp] = useState('')
    const [disp, setDisp] = useState('0')
    const isNum=(v)=>!isNaN(v)
    const isOp=(v)=> '+-*/'.includes(v)

    const updateExp = (v) => {//사용자가 버튼을 클릭했을 때 값을 업데이트하는 함수
        const newExp = exp+v;
        setExp(newExp)
        setDisp(newExp)
    }

    const reset = ()=> {
        setExp('')
        setDisp('0')
    }

    const calc=()=>{
        try{
            const result= eval(exp)
            setExp(result.toString())
            setDisp(result.toString())
        }catch{
            reset()
            setDisp('Error')
        }
    }

    const onBtnClick=(v)=>{
        const last = exp.slice(-1)

        if(isNum(v) || v==='.'){
            updateExp(v)
        }else if(isOp(v)){
            if(exp && !isOp(last)) //연산자 중복 x
                updateExp(v)
        }else if(v === 'C'){
            reset()
        }else if(v==='='){
            calc()
        }
    }

const btns = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
]


    const btnClass=(v)=>{
        if(v==='C')
            return 'clear'
        if(v==='=')
            return 'equal'
        if(isOp(v))
            return 'operator'

    }

  return (
    <div id='calculator'>
        <h1>Calculator</h1>
        <input type="text" readOnly id='display' 
        value={disp}/>
        <div id="buttons">
        {btns.map((btn, index)=>(
            <Button
            key={index}
            onClick={onBtnClick}
            value={btn}
            className={btnClass(btn)}
            />
        ))}


        </div>
    </div>
  )
}

export default Calculator