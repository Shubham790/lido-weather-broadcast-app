import React, { useState } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const api = {
  key: "ccb13f92ca8be364ae16f047190e6218",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Today() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [weather1, setWeather1] = useState([]);
  const [city1,city]=useState({});
  const [Today, settoday] = useState('');
  const [tom1,tom]= useState('');
  const [ten1,ten]=useState('');
  const search = evt => {
    
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     /// fetch(`https://pro.openweathermap.org/data/2.5/climate/month?q=London&appid=ccb13f92ca8be364ae16f047190e6218`)
        .then(res => res.json())
        
        .then(result => {
          if(result.cod!=="404")
          {
          setWeather(result);
          // setQuery('');
          console.log(result);
          }
          else
          {
            alert(result.message);
          }
        })  
  }
  const search1 = evt => {
      fetch(`${api.base}forecast?q=${query}&units=metric&cnt=10&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather1(result.list);
          // setQuery('');
          city(result.city);
          console.log(result.list);
        });
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const handleToday = evt=>{
    tom('false');ten('false'); settoday('true') ;search();
  }
  const handleTom = evt=>{
    tom('true');ten('false');settoday('false'); search1()
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      {/* <h1 style={{"color":"Yellow"}}>SG-Weather</h1><br></br> */}
      <i className="fas fa-bars"></i>
        <div className="search-box">
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
         <button type="button" className="btn btn-secondary" style={{margin:"20px 90px"}} onClick={()=> {handleTom()}}> Hourly</button>
         <button type="button" className="btn btn-secondary" style={{margin:"20px 90px"}} onClick={()=> {ten('true');tom('false');settoday('false');search1()}}>Tommorow</button>
        </div>
        {
          Today==="true"?(typeof weather.main != "undefined")?<div>
<div className="location-box">
  <div className="location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())}</div>
  <div className="date">Humidity-{weather.main.humidity}</div>
  <div className="date">Pressure-{weather.main.pressure} psi</div>
  <div className="date">{weather.weather[0].main}</div>
</div>
<div className="weather-box">
  <div className="temp">
    {Math.round(weather.main.temp)}°c
  </div>
  {/* <div className="weather">{weather.weather[0].main}</div> */}
</div>
</div>:"":tom1==="true"?(typeof weather1 != "undefined")?<div><u><center><h1>{city1.name}, {city1.country}</h1></center></u><br></br><div className="s">
 {
  weather1.map(weather=>{
  return <div style={{"width":"50%"}}>
<div className="location-box" >
  {/* <div className="location">{city1.name}, {city1.country}</div> */}
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

export default Today;


// <div>
// <div className="location-box">
//   <div className="location">{weather.name}, {weather.sys.country}</div>
//   <div className="date">{dateBuilder(new Date())}</div>
// </div>
// <div className="weather-box">
//   <div className="temp">
//     {Math.round(weather.main.temp)}°c
//   </div>
//   <div className="weather">{weather.weather[0].main}</div>
// </div>
// </div>