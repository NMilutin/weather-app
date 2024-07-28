export const API_URL = 'https://api.open-meteo.com/v1/forecast';
export const CUR_WEATHER_ARGS =
  'current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m';
export const DAILY_WEATHER_ARGS =
  'daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant';
export const HOURLY_WEATHER_ARGS =
  'hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index,is_day';
export const OTHER_ARGS = 'timezone=auto&past_days=1&forecast_hours=48';
export const GEO_API_URL =
  'https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json&name=';
export const AQI_API_URL =
  'https://air-quality-api.open-meteo.com/v1/air-quality?current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto';
