import {getJSON} from './helpers.js';
import {API_URL,CUR_WEATHER_ARG} from './config.js'
export const state = {
    current: {},
    coords: {lat:0,lon:0},
    places: [
    ],
}
const weatherCodes = new Map([
    [0,{string:"Clear Sky",icon:{dayNight: true,icon:'clear'}}],
    [1,{string:"Mainly Clear",icon:{dayNight: true,icon:'clear'}}],
    [2,{string:"Partly Cloudy",icon:{dayNight: true,icon:'partial_cloud'}}],
    [3,{string:"Overcast",icon:{icon:'overcast'}}],
    [45,"Fog"],
    [48,"Rime Fog"],
    [51,"Light Drizzle"],
    [53,"Moderate Drizzle"],
    [55,"Dense Drizzle"],
    [61,"Light Rain"],
    [63,"Moderate Rain"],
    [65,"Heavy Rain"],
    [66,"Freezing Rain"],
    [67,"Heavy Freezing Rain"],
    [71,"Light Snow"],
    [73,"Moderate Snow"],
    [75,"Heavy Snow"],
    [77,"Snow Grains"],
    [80,"Slight Rain Shower"],
    [81,"Moderate Rain Shower"],
    [82,"Heavy Rain Shower"],
    [85,"Snow Shower"],
    [86,"Heavy Snow Shower"],
    [95,"Thunderstorm"],
    [96,"Thunderstorm with hail"],
    [99,"Thunderstorm with heavy hail"]
]);
const generateCurrentForecast = function (data) {
    const weather = weatherCodes.get(data.current.weather_code);
    const object = {
        time: data.current.time,
        temperature: `${data.current.temperature_2m}${data.current_units.temperature_2m}`,
        realfeel: `${data.current.apparent_temperature}${data.current_units.apparent_temperature}`,
        dayNight: data.current.is_day?'day_':'night_',
        weather: weather.string,
        icon: `${weather.icon.dayNight ? data.current.is_day?'day_':'night_' : ''}${weather.icon.icon}`,
        wind: {speed: data.current.wind_speed_10m,direction: data.current.wind_direction_10m}
    } 
    return object;
}  

export const getForecast = async function() {
    try {
        const data = await getJSON('https://api.open-meteo.com/v1/forecast?latitude=44.6232&longitude=20.9236&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto');
        console.log(data);
        state.current = generateCurrentForecast(data);
    }
    catch(err) {
        throw err;
    }
}
