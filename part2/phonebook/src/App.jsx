import { useState ,useEffect} from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')
  const [newPersonsFilter, setPersonsFilter] = useState('')
  const [notification, setNotification] = useState(null);
  const [messageType, setMessageType] = useState('message');

  const setNotificationMessage = (message,type) => {
    setNotification(message);
    setMessageType(type);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  
  const hook = () => {
    personService  
      .getAll()
      .then((initialPersons) => {
      setPersons(initialPersons)
      console.log(import.meta.env.VITE_SOME_KEY);
    })
  }


useEffect(hook, [])

  const updateNumber = (id, number) => {
      const person = persons.find(n => n.id === id)
      const changedPerson = { ...person, number: number }
  
      personService      
        .update(id, changedPerson)
        .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotificationMessage(`¡Número de teléfono de ${newName} actualizado!`,'message')
          })
        .catch(error => {
            setNotificationMessage(error.message,'error')
        })
  }

  const addName = (event) => {
    //evita el modo por defecto
    event.preventDefault()    
    //crear un objeto con el nuevo nombre
    const nameObject = {
      name: newName, 
      number: newNumber,
      id: String(persons.length + 1),    
    }
    /* console.log('button clicked', newName) */
    //comprobar si existe el nombre
    if(persons.find(person => person.name === newName)){
     
      if(newNumber === ''){
        setNotificationMessage(`${newName} ya existe, si quiere cambiar el Teléfono inserte uno nuevo`,'error')
        return
      }
      if (window.confirm(`¿Quiere cambiar el Teléfono de ${newName} ?`)){
        //actualizar el número de la base de datos
        const person = persons.find(person => person.name === newName)
        updateNumber(person.id, newNumber)
        //inicializar las listas
        setPersonsFilter('')
        setPersons(persons)
        //limpiar el campo del filtro 
        setNewFilter('')
        //limpiar los campos del formulario
        setNewName('')
        setNewNumber('')
     }

    } 
    else{
      //agregar el nuevo nombre a la base de datos
      personService
        .create(nameObject)
        .then(returnedPerson => {
          //agregar el nuevo nombre a la lista de persons
          setPersons(persons.concat(returnedPerson))
          //limpiar los campos del formulario
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`${newName} añadido al listado telefónico`,'message') 
        })
        .catch(error => {
          setNotificationMessage(error.message,'error')
        })
              
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
     console.log(event.target.value) 
    //actualizar el estado del flitro 
    setNewFilter(event.target.value)
    //aplicar el filtro a la una nueva lista de persons
    setPersonsFilter(filterItems(event.target.value)) 
  }

  const filterItems = (query) => {
    //copiar el objetop para aplicar el filtro
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

  const remove = (event) => {
    event.preventDefault()
    const id = event.target['id'].value
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
           //inicializar las listas
          setPersonsFilter('')
           //limpiar el campo del filtro 
          setNewFilter('')
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`¡${person.name} Ha sido eliminado del listado telefónico!`,'warning') 
        })
        .catch(error => {
           if(error.status === 404){
            setNotificationMessage(`¡La información de ${person.name} ya ha sido eliminada servidor!`,'error')
            setPersons(persons.filter(p => p.id !== id))
           } else {
            setNotificationMessage(error.message,'error')
           }
        });
    }
  }

  return (
    <div>
      <Notification message={notification} messageType={messageType} />

      <h2>Phonebook</h2>
      <Filter newfilter={newfilter} 
              onChange ={handleFilterChange} 
              refresh= {refresh} 
      />

      <h2>Add a new</h2>
          <Form addName ={addName} 
                newName={newName} 
                handleNameChange={handleNameChange} 
                newNumber={newNumber} 
                handleNumberChange={handleNumberChange}
          />

      <div>
      <h2>Numbers</h2>          
          <Person persons={persons} 
                  personfilter={newPersonsFilter} 
                  remove={remove} 
          />
      </div>

    </div>
  )
}

export default App