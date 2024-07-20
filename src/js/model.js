import {getJSON} from './helpers.js';
import {API_URL,CUR_WEATHER_ARG,GEO_API_URL} from './config.js'
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
    [3,{string:"Overcast",icon:{dayNight: false, icon:'overcast'}}],
    [45,{string:"Fog",icon:{dayNight: false, icon:'fog'}}],
    [48,{string: 'Rime Fog', icon:{dayNight: false, icon: 'fog'}}],
    [51,{string: 'Drizzle', icon:{dayNight: true, icon: 'rain'}}],
    [53,{string: 'Moderate Drizzle', icon:{dayNight: true, icon: 'rain'}}],
    [55,{string: 'Dense Drizzle', icon:{dayNight: true, icon: 'rain'}}],
    [61,{string: 'Light Rain', icon:{dayNight: true, icon: 'rain'}}],
    [63,{string: 'Moderate Rain', icon:{dayNight: true, icon: 'rain'}}],
    [65,{string: 'Heavy Rain', icon:{dayNight: true, icon: 'rain'}}],
    [66,{string: 'Freezing Rain', icon:{dayNight: true, icon: 'sleet'}}],
    [67,{string: 'Heavy Freezing Rain', icon:{dayNight: true, icon: 'sleet'}}],
    [71,{string: 'Light Snow', icon:{dayNight: true, icon: 'snow'}}],
    [73,{string: 'Moderate Snow', icon:{dayNight: true, icon: 'snow'}}],
    [75,{string: 'Heavy Snow', icon:{dayNight: true, icon: 'snow'}}],
    [77,{string: 'Snow Grains', icon:{dayNight: true, icon: 'snow'}}],
    [80,{string: 'Slight Rain Shower', icon:{dayNight: true, icon: 'rain'}}],
    [81,{string: 'Moderate Rain Shower', icon:{dayNight: true, icon: 'rain'}}],
    [82,{string: 'Heavy Rain Shower', icon:{dayNight: true, icon: 'rain'}}],
    [85,{string: 'Snow Shower', icon:{dayNight: true, icon: 'snow'}}],
    [86,{string: 'Heavy Snow Shower', icon:{dayNight: true, icon: 'snow'}}],
    [95,{string: 'Thunderstorm', icon:{dayNight: false, icon: 'thunder'}}],
    [96,{string: 'Thunderstorm with Hail', icon:{dayNight: false, icon: 'thunder'}}],
    [99,{string: 'Thunderstorm with Heavy Hail', icon:{dayNight: false, icon: 'thunder'}}]
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
        wind: {speed: `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,direction: data.current.wind_direction_10m}
    } 
    return object;
}  

export const getForecast = async function() {
    try {
        const data = await getJSON('https://api.open-meteo.com/v1/forecast?latitude=44.6232&longitude=20.9236&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto');
        state.current = generateCurrentForecast(data);
    }
    catch(err) {
        throw err;
    }
}

export const searchPlace = async function(place) {
    try {
        const data = await getJSON(`${GEO_API_URL}${place}`);
        return data?.results[0];
    } catch (err) {
        throw err;
    }
}
export const placeAdd = function(place,lat,lon) {
    state.places.push({place,coords:{lat,lon}})
}

export const placeDel = function(i) {
    state.places.splice(i,1);
}