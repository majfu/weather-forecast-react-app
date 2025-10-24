import axios from "axios";
import type { City } from "./model/City";
import type { CitySearch } from "./model/CitySearch";
import type { CityForecastSearch } from "./model/CityForecastSearch";

export const getCitySearchResults = async (
  params: CitySearch,
): Promise<City[]> => {
  const response = await axios.get<City[]>(
    "http://api.openweathermap.org/geo/1.0/direct",
    { params },
  );
  return response.data;
};

export const getCityForecastSearchResults = async (
  params: CityForecastSearch,
): Promise<CityForecast> => {
  const response = await axios.get<CityForecast>(
    "https://api.openweathermap.org/data/2.5/weather",
    { params },
  );
  return response.data;
};
