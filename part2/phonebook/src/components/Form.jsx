const Form = ({
    addName,newName,handleNameChange,newNumber,handleNumberChange
}) => {
  return(
    <form onSubmit={addName}>
        <div>
          <b>Name: </b>       
          <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>
         <b>Number:</b>
        <input value={newNumber} onChange={handleNumberChange}  />
        </div>
        <div>
        <button type="submit">add</button>     
        </div>
      </form> 


  ) 
}

export default Form