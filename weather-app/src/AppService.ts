import axios from "axios";
import type { City } from "./model/City";
import type { CitySearch } from "./model/CitySearch";
import type { WeatherForecastSearch } from "./model/WeatherForecastSearch";
import type { WeatherForecast } from "./model/WeatherForecast";

export const getCitySearchResults = async (
  params: CitySearch
): Promise<City[]> => {
  const response = await axios.get<City[]>(
    "http://api.openweathermap.org/geo/1.0/direct",
    { params }
  );
  return response.data;
};

export const getWeatherForecast = async (
  params: WeatherForecastSearch
): Promise<WeatherForecast> => {
  const response = await axios.get<WeatherForecast>(
    "https://api.openweathermap.org/data/2.5/weather",
    { params }
  );
  return response.data;
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
