import { useState } from 'react'
//part1 1.11 ejercicio
const StatisticLine = ({value, text}) => {
        
    return(  
      <tr>       
      <td>{text}</td> 
      <td>{value}</td>
      </tr>
    )
  }
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good,neutral,bad,total,average,porcentaje}) => {

    if(total == 0){
      return(
              <div> 
                <h3>Estadisticas</h3>
                <p>No hay respuestas</p>
              </div>
      )
    }

  return(
    <div> 
        
      <table>
        <thead>
          <tr><th><h3>Estadisticas</h3></th></tr>
        </thead>
        <tbody>
            <StatisticLine text ={"Good:"} value={good} />
            <StatisticLine text ={"Neutral:"} value={neutral}  />
            <StatisticLine text ={"Bad:"}   value={bad} />
            <StatisticLine text ={"Total:"}   value={total} />
            <StatisticLine text ={"Promedio:"}  value={average}  />
            <StatisticLine text ={"Positivo:"}  value={porcentaje+"%"} />
        </tbody>
      </table>
    </div>
    )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [sumaverage, setSumAverage] = useState(0)
  const [porcentaje, setPorcetaje] = useState(0)
  let updatetotal 

  const handleLeGood = () =>{
    const updategood = good +1
    updatetotal = updategood + neutral + bad
    setGood(updategood) 
    setTotal(updatetotal)
    seToAverage(1)
    setPorcetaje((updategood/updatetotal)*100)
  }
  const handleLeNeutral = () =>{
    const updateneutral = neutral +1
    setNeutral(updateneutral)
    updatetotal =  good + updateneutral + bad
    setTotal(updatetotal)
    seToAverage(0)
    setPorcetaje((good/updatetotal)*100)
  }
  const handleLeBad = () =>{
    const updatebad = bad +1
    setBad(updatebad)
    updatetotal = good + neutral + updatebad
    setTotal(updatetotal)
    seToAverage(-1)
    setPorcetaje((good/updatetotal)*100)
  }
   
  const seToAverage = (e) =>{
    const updatesumaverage = sumaverage + e
    setSumAverage(updatesumaverage)
    const updateaverage = updatesumaverage /updatetotal 
    console.log("To "+updatetotal+" Av "+updatesumaverage)
    setAverage(updateaverage)  
  }


  return (
    <div>
      <h2>Danos tu opinion</h2>
      <Button handleClick={() => handleLeGood()} text="Good" />      
      <Button handleClick={() => handleLeNeutral()} text="Neutral" />
      <Button handleClick={() => handleLeBad()} text="Bad" />    
     < Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} porcentaje={porcentaje}/>
    </div>
  )
}

export default App