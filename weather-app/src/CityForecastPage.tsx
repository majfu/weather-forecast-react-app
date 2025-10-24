import { Navigate, useLocation } from "react-router-dom";
import type { CityForecastSearch } from "./model/CityForecastSearch";

function CityForecastPage() {
  const location = useLocation();
  const state = location.state;
  const city = state.city;

  const cityForecastSearchParams: CityForecastSearch = {
    lat: city.lat,
    lon: city.lon,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: "standard",
  };

  return <>{city.name}</>;
}

export default CityForecastPage;
