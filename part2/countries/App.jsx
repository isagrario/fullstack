
import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Content from './components/Content'
import countriesService from './services/countries'
import weatherService from './services/weather'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newfilter, setNewFilter] = useState('')
  const [newCountriesFilter, setCountriesFilter] = useState('')
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState('')

  const hook = () => {
      countriesService  
        .getAll()
        .then((initialCountries) => {
        setCountries(initialCountries)
        
      })
  }  
  
  useEffect(hook, [])

  

  const handleFilterChange = (event) => {    
     console.log(event.target.value) 
    //actualizar el estado del flitro 
    setNewFilter(event.target.value)
    //aplicar el filtro a la una nueva lista de Countries
    const filteredCountries = filterItems(event.target.value)
    if(filteredCountries.length === 1){
      GetCountry(filteredCountries[0].name)
    }
    else{
      setCountriesFilter(filteredCountries) 
      setCountry('')
    }
    
  }
  
  const filterItems = (query) => {
    //copiar el objetop para aplicar el filtro
    const filterCountries = [...countries]
    return filterCountries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))
  }

  const GetCountry = (name) => {
   
    console.log('Getting country', name)
    countriesService  
        .getByName(name)
        .then((OneCountry) => {
          //console.log(OneCountry)
          setCountry(OneCountry)
          GetWeather(OneCountry.capital)
          setCountriesFilter('')
          setNewFilter('')
        })
  }
  
  const ButtonGetCountry = (event) => {
    event.preventDefault()
    const name = event.target.id.value
    GetCountry(name)
  }

  const GetWeather =(city)=>{
    weatherService
      .getByCity(city)
      .then((Currentweather) =>{
        setWeather(Currentweather)
      })
  }


  return (
    <div>
        <h1>Countries</h1>
        
        <Filter newfilter={newfilter} 
              onChange ={handleFilterChange} 
      />
        
      <Content list = {newCountriesFilter}
        selcountry = {country}
        GetCountry={ButtonGetCountry}
        weather= {weather}
         />

        
    </div>
  )
}

export default App