import { useState } from 'react'
//1.14 ejercicio

const Button = (props) => (
  <div>
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  </div>
)

const Statistics = ({voto}) => {
  return (
    <div>      
      <p>Esta anecdota tiene {voto} votos</p>
    </div>
  )
}

const Result = ({result,votos}) => {
  return (
    <div>  
      <h2>La anecdota más votada</h2>
      {result} 
      <p>Con {votos} votos</p>   
    </div>
  )
}

const App = () => {
  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voto, setVoto] = useState(0)
  const [result, setResult] = useState(0)
  const [votos, setVotos] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0})
 
  const handleLeNext = () => {
    let numero
    do {
      numero = Math.floor(Math.random() * anecdotes.length)
    } while (numero === selected)
    setSelected(numero)
    setVoto(votos[numero])
  }

 
  const handleLeVote = (index) => {    
    //console.log("votaste: "+index)
    const copy = { ...votos }
    copy[index] += 1
    setVotos(copy)
    console.log(copy)
    setVoto(copy[index])
     // obtener la key (índice) con el valor más alto
    const maxKey = Object.keys(copy).reduce(
      (a, b) => (copy[a] >= copy[b] ? a : b),
      Object.keys(copy)[0]
    )
    setResult(Number(maxKey))
  }
  
  return (
    <div>
      <h2>La anecdota del dia</h2>
      {anecdotes[selected]}
      <Statistics voto={voto}  />
      <Button handleClick={() => handleLeVote(selected)} text="Vota esta anecdota" />  
      <Button handleClick={() => handleLeNext()} text="Siguiente anecdota" /> 
      <Result result={anecdotes[result]} votos = {votos[result]}/>
    </div>
  )
}

export default App