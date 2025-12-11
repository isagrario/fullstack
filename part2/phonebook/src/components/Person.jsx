const Person = ({ persons, personfilter,remove ,error}) => {
  //Mostrar error si existe
  if(error){
    return(
      <div style={{color: 'red'}}>
        {error.message}
      </div>
    )
  }
 //Si hay filtro, mostrar la lista filtrada
  let personArray = []
  if (personfilter && personfilter.length > 0){
    personArray = [ ...personfilter]
  }
  //Si no hay filtro, mostrar la lista completa
  else {
    personArray = [ ...persons]
  }
    return(
      <ul>
      {personArray.map(person => 

            <li key={person.id} >
               {person.name} -- {person.number}
              <form onSubmit={remove}>
                <input type="hidden" name="id" value={person.id} /> 
               <button type="submit" >delete</button>
              </form>
            </li>
             
          )}
      </ul>
    ) 
  }

export default Person