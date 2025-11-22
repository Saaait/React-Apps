import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [unit, setUnit] = useState('C'); // 'C' or 'F'

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon,
    }

    const convertTemp = (temp) => {
        if (unit === 'F') {
            return Math.round((temp * 9) / 5 + 32);
        }
        return Math.round(temp);
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3e5320b80ca40bb00386a70b6658df08`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
                icon: icon
            });

        } catch (error) {
            setWeatherData(false);
            console.log("Error in fetching api data");
        }
    }

    useEffect(() => {
        search("Kathmandu");
    }, [])

    // Reset function
    const reset = () => {
        inputRef.current.value = "";  // clear input
        setUnit('C');                 // reset unit to Celsius
        search("Kathmandu");          // reset weather to default city
    }

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>

            {/* Unit Toggle Buttons */}
            <div className="unit-toggle">
                <button onClick={() => setUnit('C')} className={unit === 'C' ? 'active' : ''}>°C</button>
                <button onClick={() => setUnit('F')} className={unit === 'F' ? 'active' : ''}>°F</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>

            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    <p className='temperature'>{convertTemp(weatherData.temperature)}°{unit}</p>
                    <p className='location'>{weatherData.location}</p>

                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt="Humidity" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt="Wind Speed" />
                            <div>
                                <p>{weatherData.wind} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Weather
