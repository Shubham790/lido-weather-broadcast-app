import React, { useState } from 'react';
import './css/Weather.css';
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
  let [wea,wea1]=useState('false');
  let [counter]=useState(1);
  let [display,display1]=useState('false');
  let [error,error1]=useState('');
  const todaySearch = evt => {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res =>{
          if(res.ok === true){
            res.json().then(result=>{
              setWeather(result);
            })
          }
          else
          {
            display1('true');
            tom('false');ten('false'); settoday('false');
            error1("Please Enter a valid city")
          }
        })
  }
  const tommorowSearch = evt => {
      fetch(`${api.base}forecast?q=${query}&units=metric&cnt=10&APPID=${api.key}`)
        .then(res =>{
          if(res.ok === true){
            res.json().then(result=>{
              setWeather1(result.list);
              city(result.city);
            })
          }
          else
          {
            display1('true');
            tom('false');ten('false'); settoday('false');
            error1("Please Enter a valid city");
          }
        })
  }
  const handleToday = evt=>{
    tom('false');ten('false'); settoday('true') ;todaySearch();display1("false")
  }
  const handleTomorrow = evt=>{
    tom('true');ten('false');settoday('false'); tommorowSearch();display1("false")
  }
  const handleHourly = evt=>{
    ten('true');tom('false');settoday('false');tommorowSearch();display1("false")
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <center><h1 style={{"color":"white"}}>Weather Broadcast</h1></center><br></br>
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
            { display==="true"?<div className="jumbotron text center font-weight-bold">
              {error}
             </div>:""
            }
          <button type="button" className="btn btn-info" style={{margin:"10px 10px"}} onClick={()=>{handleToday()}}>Today</button>
          <button type="button" className="btn btn-info" style={{margin:"20px 10px"}} onClick={()=> {handleTomorrow()}}> Hourly</button>
          <button type="button" className="btn btn-info" style={{margin:"20px 10px"}} onClick={()=> {handleHourly()}}>Tommorow</button>
        </div>
        {
          Today==="true"?(typeof weather.main != "undefined")?<div>
            <div className="weather-box">
              <div className="temp" onClick ={()=>{wea==="true"?wea1('false'):wea1('true')}}>
                {wea === "true" ? Math.round(weather.main.temp)+'°C':Math.round(((weather.main.temp*9/5)+32))+'°F'}
                {
                  (weather.weather[0].main)==="Rain"?<i className="fas fa-cloud-sun-rain"></i>: (weather.weather[0].main)==="Clear"?<i className="fas fa-sun"></i>:<i className="fas fa-cloud"></i>
                }
              </div>
            </div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="date">Humidity-{weather.main.humidity}</div>
              <div className="date">Pressure-{weather.main.pressure} psi</div>
            </div>
          </div>:"":tom1==="true"?(typeof weather1 != "undefined")?<div><u style={{"color":"white"}}><center><h1 style={{"color":"white"}}>{city1.name},{city1.country}</h1></center></u><br></br><div className="s">
            {
              weather1.map(weather=>{
                return <div style={{"width":"50%"}} key={counter=counter+1}>
                <div className="weather-box" >
                    <div className="temp" onClick ={()=>{wea==="true"?wea1('false'):wea1('true')}}>
                      {wea === "true" ? Math.round(weather.main.temp)+'°C':Math.round(((weather.main.temp*9/5)+32))+'°F'}
                      {
                        (weather.weather[0].main)==="Rain"?<i className="fas fa-cloud-sun-rain"></i>: (weather.weather[0].main)==="Clear"?<i className="fas fa-sun"></i>:<i className="fas fa-cloud"></i>
                       }
                    </div>
                  </div>
                  <div className="location-box" >
                    <div className="location">{weather.dt_txt}</div>
                    <div className="date">Humidity-{weather.main.humidity}</div>
                    <div className="date">Pressure-{weather.main.pressure} psi</div>
                  </div>
                  <hr></hr>
                </div>
              })
            }</div></div>:""
          :ten1==="true"?
            (typeof weather1 != "undefined")?
              weather1.slice(8,9).map(weather=>{
                return <div key={counter=counter+1} >
                  <div className="weather-box">
                    <div className="temp" onClick ={()=>{wea==="true"?wea1('false'):wea1('true')}}>
                      {wea === "true" ? Math.round(weather.main.temp)+'°C':Math.round(((weather.main.temp*9/5)+32))+'°F'}
                      {
                        (weather.weather[0].main)==="Rain"?<i className="fas fa-cloud-sun-rain"></i>: (weather.weather[0].main)==="Clear"?<i className="fas fa-sun"></i>:<i className="fas fa-cloud"></i>
                      }
                    </div>
                  </div>
                  <div className="location-box">
                    <div className="location">{city1.name}, {city1.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                    <div className="date">Humidity-{weather.main.humidity}</div>
                    <div className="date">Pressure-{weather.main.pressure} psi</div>
                  </div>
                </div>
              }):""
          :""
        }
      </main>
    </div>
  );
}
export default Weather;