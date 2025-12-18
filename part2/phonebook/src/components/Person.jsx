const Person = ({ persons, personfilter,remove ,error}) => {
  const LineStyle = {    
      color: 'grey',
      fontSize: 15,
      paddingTop: 3,
      marginBottom: 10,
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

            <li key={person.id} style={LineStyle} >
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