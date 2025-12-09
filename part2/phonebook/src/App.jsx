import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')
  const [newPersonsFilter, setPersonsFilter] = useState('')

  const addName = (event) => {
    //evita el modo por defecto
    event.preventDefault()    
    //crear un objeto con el nuevo nombre
    const nameObject = {
      name: newName, 
      number: newNumber,
      id: persons.length + 1,    
    }
    /* console.log('button clicked', newName) */
    //comprobar si existe el nombre
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } 
    else{
      //agregar el nuevo nombre a la lista de persons
      setPersons(persons.concat(nameObject))
      //limpiar los campos del formulario
      setNewName('')
      setNewNumber('')  
    }
  }

  const handleNameChange = (event) => {    
    /* console.log(event.target.value)  */ 
    //actualizar el estado del nuevo nombre  
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    /* console.log(event.target.value)  */ 
    //actualizar el estado del nuevo número
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {    
     //console.log(event.target.value) 
    //actualizar el estado del flitro 
    setNewFilter(event.target.value)
    //aplicar el filtro a la una nueva lista de persons
    setPersonsFilter(filterItems(event.target.value)) 
  }

  const filterItems = (query) => {
    //copiamos el objetop para aplicar el filtro
    const filterpersons = [...persons]
    return filterpersons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
  }

  const refresh = () => {
    //inicializar las listas
    setPersonsFilter('')
    setPersons(persons)
    //limpiar el campo del filtro 
    setNewFilter('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newfilter={newfilter} onChange ={handleFilterChange} refresh= {refresh} />

      <h2>Add a new</h2>

      <Form addName ={addName} 
            newName={newName} 
            handleNameChange={handleNameChange} 
            newNumber={newNumber} 
            handleNumberChange={handleNumberChange}
      />
       
      <div>
      <h2>Numbers</h2>      
         
          <Person  persons={persons} personfilter={newPersonsFilter}/>        
     
      </div>
    </div>
  )
}

export default App