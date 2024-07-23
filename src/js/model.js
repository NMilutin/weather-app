import {getJSON} from './helpers.js';
import {API_URL,CUR_WEATHER_ARGS,GEO_API_URL,DAILY_WEATHER_ARGS,OTHER_ARGS} from './config.js'
class State {
    current = {};
    daily = {};
    places = [
    ];
    get activePlace() {
        return this.places.find(place=>place.active);
    }
}
export const state = new State();
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
        place: state.activePlace.place,
        index: state.places.indexOf(state.activePlace),
        length: state.places.length,
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

const generateDailyForecast = function (data) {
    const weather = data.daily.weather_code.map(code=>weatherCodes.get(code))
    const arr = JSON.parse(JSON.stringify(new Array(data.daily.time.length).fill(new Object())));
    arr.forEach((day,i)=>{
        day.date = (()=>{
            const time = new Date(data.daily.time[i]);
            const today = new Date();
            if (time.toDateString() === today.toDateString()) return 'Today';
            if (today > time) return 'Yesterday';
            if (time.getDate() === today.getDate()+1) return 'Tomorrow';
            return `${time.getDate()}/${time.getMonth()+1}`
        })();
        day.weekday = new Date(data.daily.time[i]).getDay();
        day.weather = weather[i].string;
        day.temperatureMax = `${data.daily.temperature_2m_max[i]}${data.daily_units.temperature_2m_max}`;
        day.temperatureMin = `${data.daily.temperature_2m_min[i]}${data.daily_units.temperature_2m_min}`;
        day.uv = data.daily.uv_index_max[i];
        day.sunrise = (() => {
            const time = new Date(data.daily.sunrise[i]);
            return `${time.getHours()}:${(time.getMinutes()+'').padStart(2,'0')}`
        })();
        day.sunset = (() => {
            const time = new Date(data.daily.sunset[i]);
            return `${time.getHours()}:${(time.getMinutes()+'').padStart(2,'0')}`
        })();
        day.precipitation = data.daily.precipitation_probability_max[i] +'%'; 
        day.iconDay = `${weather[i].icon.dayNight?'day_':''}${weather[i].icon.icon}`,
        day.iconNight = `${weather[i].icon.dayNight?'night_':''}${weather[i].icon.icon}`,
        day.wind = {speed: `${data.daily.wind_speed_10m_max} ${data.daily_units.wind_speed_10m_max}`,direction: data.daily.wind_direction_10m_dominant}
    })
    return arr;
}

export const getForecast = async function() {
    try {
        const data = await getJSON(`${API_URL}?longitude=${state.activePlace.coords.lon}&latitude=${state.activePlace.coords.lat}&${CUR_WEATHER_ARGS}&${DAILY_WEATHER_ARGS}&${OTHER_ARGS}`);
        state.current = generateCurrentForecast(data);
        state.daily = generateDailyForecast(data)
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
    state.places.push({place,coords:{lat,lon}});
    if (state.places.length===1) setActivePlace(0);
    saveStorage();
}

export const placeDel = function(i) {
    const wasActive = state.activePlace === state.places[i];
    state.places.splice(i,1);
    if (wasActive) setActivePlace(0);
    saveStorage();
}

export const setActivePlace = function(i) {
    if (state.places.length === 0) {
        saveStorage();
        return;
    }
    state.places.forEach(place => {
        place.active=false
    });
    state.places[i].active=true;
    saveStorage()
}

const saveStorage = function () {
    localStorage.setItem('places',JSON.stringify(state.places));
}

export const loadStorage = function () {
    const places = JSON.parse(localStorage.getItem('places'));
    if (places?.length === 0 || !Array.isArray(places)) return;
    state.places = [...places];
}