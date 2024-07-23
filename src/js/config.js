export const API_URL = 'https://api.open-meteo.com/v1/forecast';
export const CUR_WEATHER_ARGS = 'current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m'
export const DAILY_WEATHER_ARGS = 'daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant'
export const OTHER_ARGS = 'timezone=auto&past_days=1'
export const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json&name=';