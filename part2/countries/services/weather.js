import axios from 'axios'

const getByCity = (city ) => {
  const key =  import.meta.env.VITE_OPWEATHER_KEY
  const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city +'&appid='+ key
  const request = axios.get(url)  
  return request.then(response => response.data)
}

export default { getByCity }