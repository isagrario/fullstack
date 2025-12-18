const Filter = ({newfilter, onChange}) => {
  return(
     <div>
     <input value={newfilter} onChange ={onChange}  />
     
     </div>
  ) 
}

export default Filter