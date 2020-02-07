import React, { useState } from 'react';
import './Weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dateBuilder from "./Datebuilder";
const api = {
  key: "ccb13f92ca8be364ae16f047190e6218",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [weather1, setWeather1] = useState([]);
  const [city1,city]=useState({});
  const [Today, settoday] = useState('');
  const [tom1,tom]= useState('');
  const [ten1,ten]=useState('');
  const todaySearch = evt => {
    if(query!=="")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if(result.cod!=="404")
          {
          setWeather(result);
          console.log(result);
          }
          else
          {
            alert(result.message);
          }
        })  
      }
      else
      {
        alert("Please Enter City Name");
      }
  }
  const tommorowSearch = evt => {
    if(query!="")
    {
      fetch(`${api.base}forecast?q=${query}&units=metric&cnt=10&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather1(result.list);
          city(result.city);
          console.log(result.list);
        });
      }
        else
        {
          alert("Please Enter City Name");
        }
  }
  const handleToday = evt=>{
    tom('false');ten('false'); settoday('true') ;todaySearch();
  }
  const handleTomorrow = evt=>{
    tom('true');ten('false');settoday('false'); tommorowSearch()
  }
  const handleHourly = evt=>{
    ten('true');tom('false');settoday('false');tommorowSearch()
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>      
        <div className="search-box">
        <h1 style={{"color":"white"}}>Weather Broadcast</h1><br></br>
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            minLength='3'
            maxLength='30'
            value={query}
          />
         <button type="button" className="btn btn-secondary" style={{margin:"20px 90px"}} onClick={()=>{handleToday()}}>Today</button>
         <button type="button" className="btn btn-secondary" style={{margin:"20px 90px"}} onClick={()=> {handleTomorrow()}}> Hourly</button>
         <button type="button" className="btn btn-secondary" style={{margin:"20px 90px"}} onClick={()=> {handleHourly()}}>Tommorow</button>
        </div>
        {
          Today==="true"?(typeof weather.main != "undefined")?<div>
<div className="location-box">
  <div className="location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())}</div>
  <div className="date">Humidity-{weather.main.humidity}</div>
  <div className="date">Pressure-{weather.main.pressure} psi</div>
  <div className="date">{weather.weather[0].main} psi</div>
</div>
<div className="weather-box">
  <div className="temp">
    {Math.round(weather.main.temp)}°c
  </div>
</div>
</div>:"":tom1==="true"?(typeof weather1 != "undefined")?<div><u><center><h1>{city1.name}, {city1.country}</h1></center></u><br></br><div className="s">
 {
  weather1.map(weather=>{
  return <div style={{"width":"50%"}}>
<div className="location-box" >
  <div className="location">{weather.dt_txt}</div>
  <div className="date">Humidity-{weather.main.humidity}</div>
  <div className="date">Pressure-{weather.main.pressure} psi</div>
</div>
<div className="weather-box" >
  <div className="temp">
    {Math.round(weather.main.temp)}°c
  </div>
  <div className="weather">{weather.weather[0].main},{weather.weather[0].description}</div>
</div>
<hr></hr>
</div>
})}</div></div>:""
:ten1==="true"?
(typeof weather1 != "undefined")?
weather1.slice(8,9).map(weather=>{
  return <div>
<div className="location-box">
<p>1</p>
  <div className="location">{city1.name}, {city1.country}</div>
  <div className="date">{weather.dt_txt}</div>
  <div className="date">Humidity-{weather.main.humidity}</div>
  <div className="date">Pressure-{weather.main.pressure} psi</div>
</div>
<div className="weather-box">
  <div className="temp">
    {Math.round(weather.main.temp)}°c
  </div>
  <div className="weather">{weather.weather[0].main},{weather.weather[0].description}</div>
</div>
<hr></hr>
</div>
}):""
:""
        }
      </main>
      </div>
  );
}
export default Weather;