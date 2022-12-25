import { updateIcon, updateValues, getWeatherIcon, formatDay, formatHour, updateValuesDay, updateIconDay, updateValuesHourly, updateIconHourly } from "./helpers.js"

const url = "https://api.open-meteo.com/v1/forecast?latitude=45.55&longitude=18.69&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin"

let weatherData

async function getWeatherData() {
    const res = await fetch(url)
    const data = await res.json()
    weatherData = data
    console.log(weatherData)
    updateCurrentTemp()
    updateDailyWeather()
    updateHourlyWeather()
    document.body.classList.remove('blurred')
}

getWeatherData()

function updateCurrentTemp() {

    const { 
        temperature : currentTemp, 
        windspeed : windSpeed,
        weathercode: weatherCode
        } 
        = weatherData.current_weather

    const { 
        temperature_2m_max : [currentHigh], 
        temperature_2m_min : [currentLow], 
        apparent_temperature_max : [currentHighFL], 
        apparent_temperature_min : [currentLowFL]
    } = weatherData.daily

    const { precipitation: [precip] } = weatherData.hourly

    const currentWeather = { 
        currentTemp,
        windSpeed,
        currentHigh,
        currentLow,
        currentHighFL,
        currentLowFL,
        precip,
        weatherCode
    }
    
    updateValues("[data-current-temp]", currentWeather.currentTemp)
    updateValues("[data-current-high]", currentWeather.currentHigh)
    updateValues("[data-current-fl-high]", currentWeather.currentHighFL)
    updateValues("[data-current-wind]", currentWeather.windSpeed)
    updateValues("[data-current-low]", currentWeather.currentLow)
    updateValues("[data-current-fl-low]", currentWeather.currentLowFL)
    updateValues("[data-current-precipitation]", currentWeather.precip)
    updateIcon("[data-current-icon]", getWeatherIcon(currentWeather.weatherCode))
}

function updateDailyWeather() {
    const { apparent_temperature_max: dailyHigh, weathercode: weatherCode, time } = weatherData.daily 
    
    let dayZero
    let dayOne
    let dayTwo
    let dayThree
    let dayFour
    let dayFive
    let daySix

    for (let i = 0; i < dailyHigh.length; i++) {
            if (i === 0) {
                dayZero = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            } else if (i === 1) {
                dayOne = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            } else if (i === 2) {
                dayTwo = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            } else if (i === 3) {
                dayThree = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            } else if (i === 4) {
                dayFour = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            }  else if (i === 5) {
                dayFive = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            } else {
                daySix = new Object({ dailyHigh: dailyHigh[i], weatherCode: weatherCode[i], day: formatDay(time[i]) })
            }
    }

    let comingDays = [dayZero, dayOne, dayTwo, dayThree, dayFour, dayFive, daySix]
    const icons = [...document.querySelectorAll('.day-card .weather-icon')]
    const days = [...document.querySelectorAll('.day-card-day')]
    const temperatures = [...document.querySelectorAll('.daily-temp')]
    
    for(let i = 0; i < comingDays.length; i++) {
        updateIconDay(icons[i], getWeatherIcon(comingDays[i].weatherCode))
        updateValuesDay(days[i], comingDays[i].day)
        updateValuesDay(temperatures[i], comingDays[i].dailyHigh + "°")
    }
    
}

const rowTemplate = document.querySelector('#hour-row-template')
const tableBody = document.querySelector('[data-hour-section]')


const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric"})

async function updateHourlyWeather() {

    let { 
        temperature_2m: temp, 
        apparent_temperature: tempFL,
        time,
        windspeed_10m: windSpeed,
        precipitation: precip,
        weathercode: weatherCode
    } = weatherData.hourly

    let currentTime = await weatherData.current_weather.time * 1000
   
   time = time.filter(timestamp => timestamp * 1000 >= currentTime)
  

    for (let i = 0; i < 20; i++) {
        const element = rowTemplate.content.cloneNode(true)
        updateValuesHourly(element, "[data-temp]", temp[i])
        updateValuesHourly(element, "[data-day]", formatDay(time[i]))
        updateValuesHourly(element, "[data-time]", formatHour(time[i]) + ' h')
        updateValuesHourly(element, "[data-fl-temp]", tempFL[i])
        updateValuesHourly(element, "[data-precip]", precip[i])
        updateValuesHourly(element, "[data-wind]", windSpeed[i])
        updateIconHourly(element, "[data-icon]", getWeatherIcon(weatherCode[i]) )
        tableBody.appendChild(element)
    }       
}