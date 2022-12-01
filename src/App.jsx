import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const changeUnitTemperature = () => setIsCelsius(!isCelsius);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;

      console.log('Tu ubicación actual es:');
      console.log(`Latitud : ${crd.latitude}`);
      console.log(`Longitud: ${crd.longitude}`);
      console.log(`Más o menos ${crd.accuracy} metros.`);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8719238a1613235e8c2dfd4eedda03d5`
        )
        .then(res => {
          const tempKelvin = res.data.main.temp;
          const tempCelsius = (tempKelvin - 273.15).toFixed(1);
          const tempFahrenheit = ((tempCelsius * 9) / 5 + 32).toFixed(0);
          const newTemperasture = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit,
          };
          setTemperature(newTemperasture);
          setWeather(res.data);
        });
    }
  }, []);
  return (
    <div className='App'>
      <h1>Weather App</h1>
      <h2>
        {weather.name}, {weather.sys?.country}
      </h2>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
        alt=''
      />
      <ul>
        <li>"{weather.weather?.[0].description}"</li>
        <li>
          <i className='fa-solid fa-wind'></i> wind speed: {weather.wind?.speed}{' '}
          m/s
        </li>
        <li>
          <i className='fa-solid fa-cloud'></i> Cloud: {weather.clouds?.all}%
        </li>
        <li>
          <i className='fa-solid fa-temperature-three-quarters'></i> Pressure:{' '}
          {weather.main?.pressure}
        </li>
      </ul>

      <p>
        <b>
          {isCelsius
            ? `${temperature?.celsius} °C`
            : `${temperature?.fahrenheit} °F`}{' '}
        </b>
      </p>
      <button onClick={changeUnitTemperature}>Degrees °F/°C</button>
    </div>
  );
}

export default App;
