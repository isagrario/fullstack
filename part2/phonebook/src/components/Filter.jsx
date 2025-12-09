const Filter = ({newfilter, onChange,refresh}) => {
  return(
     <div>
     <input value={newfilter} onChange ={onChange}  />
     <button type="submit" onClick={refresh}>Refresh</button> 
     </div>
  ) 
}

export default Filter