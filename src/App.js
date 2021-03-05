import { useState } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import './App.css';
import api from './Api'



function App() {

  const [search, setSearch]  = useState('')
  const [weather, setWeather] = useState({})
  const date = new Date();
  
  function findCity(e) {
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then(result => {
      setSearch('')
      setWeather(result)
      console.log(result);
    })
    }
  }

  return (
    <div className={(typeof weather.main !== "undefined" ? ((weather.main.temp >= 20) ? "app warm" : "app"): "app" )}>
     <main>
       <div className="search-box">
         <input type="text" placeholder="Your City Name" 
         onChange= {e => setSearch(e.target.value)} value={search} onKeyPress={findCity} className="search-bar"/>
       </div>
      {(typeof weather.main !== "undefined")? (
        <div>
           <div className="location-box">
         <div className="location">{weather.name}, {weather.sys.country}</div>
         <div className="date"><Moment format='MMMM Do YYYY, h:mm a'>{date}</Moment></div>
       </div>

       <div className="weather-box">
         <div className="temp">
           {Math.round(weather.main.temp)}° C 
         </div>
         <div className="weather">{weather.weather[0].main}</div>
       </div>
        </div>
      ): ('')}
     </main>
    </div>
  );
}

export default App;
