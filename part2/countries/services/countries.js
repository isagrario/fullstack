import axios from 'axios'


const getAll = () => {
  const url = 'http://localhost:3001/countries'
  const request = axios.get(url)  
  return request.then(response => response.data)
}
const getByName = (name ) => {
  const url = 'https://studies.cs.helsinki.fi/restcountries//api/name/' + name
  const request = axios.get(url)  
  return request.then(response => response.data)
}

export default { getAll, getByName }