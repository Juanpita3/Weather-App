import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Wheather = () => {
    
    const [weather, setWeather] = useState({});
    const [degrees, setDegrees] = useState(0);
    const [isKelvin, setIsKelvin] = useState(true);
    const [maxDeg, setMaxDeg] = useState(0);
    const [minDeg, setMinDeg] = useState(0);
    
    useEffect(()=>{
        function success(pos){
            let crd = pos.coords;

            console.log('Your current position is: ');
            console.log('Latitude: '+crd.latitude);
            console.log('Longitude: '+crd.longitude);
            console.log('More or less '+crd.accuracy+' meters.');

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=75f315a00794f700bb4e3b4dd4058bd9`).then((res) => {
                setWeather(res.data);
                setDegrees(res.data.main?.temp)
                setMaxDeg(res.data.main?.temp_max)
                setMinDeg(res.data.main?.temp_min)
            })
        }

        function error(err){
            console.log("el usuario no permitió dar la ubicacion");
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    const changeDeg = () =>{
        if(isKelvin){
            
            setDegrees(degrees-273.15);
            setMaxDeg(maxDeg-273.15);
            setMinDeg(minDeg-273.15);
            setIsKelvin(false);
        } else {
          
            setDegrees(degrees+273.15);
            setMaxDeg(maxDeg+273.15);
            setMinDeg(minDeg+273.15);
            setIsKelvin(true);
        }
    }

    return (

    <div className='Container-Weather'>
        <h2 className='title'>Weather App</h2>
        <h2 className='City'>{weather.name}, {weather.sys?.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="weather" />

         <div className='G-kelvin'>
             <p>{Math.ceil(degrees)} {isKelvin ? "°k" : "°C"}</p>
         </div>

         <div className='Container-info'>
             <p className='over-Clouds'> <b>"{weather.weather?.[0].description}"</b></p>
             <p> <b><span>Wind speed:</span></b> {weather.wind?.speed} m/s</p>
             <p> <b><span>Clouds:</span></b> {weather.clouds?.all}%</p>
             <p> <b><span>Humidity level:</span></b> {weather.main?.humidity}g/m³</p>
             <p> <b><span>Pressure:</span></b> {weather.main?.pressure} mb</p>
             <p> <b><span>Temp max:</span></b> {Math.ceil(maxDeg)} {isKelvin ? "°k" : "°C"}</p>
             <p> <b><span>Temp min:</span></b> {Math.ceil(minDeg)} {isKelvin ? "°k" : "°C"}</p>
             <p></p>
        </div>
            <button onClick={changeDeg}><p>Degrees °K/°C</p></button>

        </div>
    );
};

export default Wheather;