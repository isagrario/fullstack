const CountriesList = ({list,getcountry}) => {
  const LineStyle = {    
      color: 'grey',
      fontSize: 15,
      paddingTop: 3,
      marginBottom: 10,
    }  
  return(
        <ul>
        {list.map(country => 

              <li key={country.name} style={LineStyle} >
                {country.name} -- {country.official}
                {/* El boton  se usa cuando el filtro no refina suficiente, por ejemplo: United States */}
                <form onSubmit={getcountry}>
                  <input type="hidden" name="id" value={country.name} /> 
                <button type="submit" >Show</button>
                </form>
              </li>
              
            )}
        </ul>
      ) 
  
}

const Weather = (weather) =>{

  const pStyle = {    
      color: 'grey',
      fontSize: 15,
      paddingTop: 3,
      marginBottom: 10,
      textTransform: 'capitalize',
    }
  const C = weather.weather.main.temp

  return(
    <div>
      <h3>Weather in {weather.weather.name} </h3>     
      < img src= {`https://openweathermap.org/img/wn/${weather.weather.weather[0].icon}.png`} width="100" />
       <p style={pStyle} >{weather.weather.weather[0].description}</p>
      <p style={pStyle}>Wind {weather.weather.wind.speed} m/s</p>
      <p style={pStyle}>Temp {C} c</p>
    </div>
  )
}

const Content = ({list,selcountry,GetCountry,weather}) => {
 
     if(Object.keys(selcountry).length > 0){
      return(
        <div>
          <table cellpadding= "15" >
            <tbody>
              <tr>
                <td>
                  <h2>{selcountry.name.common}</h2>
                </td>
                <td clo="2"></td>
              </tr>
              <tr >
                <td>                  
                   <img src={selcountry.flags.png} alt={`Flag of ${selcountry.name}`} width="150" />
                </td>
                <td>
                  <p>Capital: {selcountry.capital}</p>
                  <p>Population: {selcountry.population}</p>                 
                </td>
                <td>
                  <h3>Languages</h3>
                  <ul>
                    {Object.values(selcountry.languages).map((lang) => 
                      <li key={lang}>{lang}</li>  
                    )}
                  </ul>
                </td>
              </tr>
              <tr>
                
                <td>
                    <Weather weather={weather}/>
                </td>
                <td>
                  <h3>Maps</h3>
                  <p><a href={selcountry.maps.googleMaps} target="_blank" rel="noreferrer">GoogleMaps</a></p>
                  <p><a href={selcountry.maps.openStreetMaps} target="_blank" rel="noreferrer">OpenStreetMaps</a></p>
                </td>
                <td></td>
              </tr>

            </tbody>
          </table>
        </div>
      )
    } 
    if(list.length ===0){
      return <p>No countries to show</p>
    }
    if(list.length > 10){
      return <p>Refine your search</p>
    }
    else{
      return(<CountriesList list={list} getcountry={GetCountry} />)
    }
    
}

export default Content