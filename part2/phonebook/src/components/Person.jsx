const Person = ({ persons, personfilter }) => {
  
  if (personfilter && personfilter.length > 0){
    return(
      <ul>
      {personfilter.map(person => 

            <li key={person.id} >{person.name} -- {person.number}</li>
          )}
      </ul>
    ) 
  }
  else {
  return(
    <ul>
    {persons.map(person => 

          <li key={person.id} >{person.name} -- {person.number}</li>
        )}
    </ul>
  ) 
  }
}

export default Person