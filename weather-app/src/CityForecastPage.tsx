import { Navigate, useLocation } from "react-router-dom";
import type { CityForecastSearch } from "./model/CityForecastSearch";
import { useEffect, useState } from "react";
import { getCurrentForecast } from "./AppService";
import type { CityForecast } from "./model/CityForecast";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import AppText from "./components/AppText/AppText";

function CityForecastPage() {
  const location = useLocation();
  const state = location.state;
  const city = state.city;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentForecast, setCurrentForecast] = useState<CityForecast>();

  const cityForecastSearchParams: CityForecastSearch = {
    lat: city.lat,
    lon: city.lon,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: "standard",
  };

  const getForecast = async () => {
    setIsLoading(true);

    try {
      const results = await getCurrentForecast(cityForecastSearchParams);
      setCurrentForecast(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <div className="flex w-screen h-screen bg-sky-50 flex-col p-20 items-center">
      {isLoading && <LoadingOverlay />}
      {currentForecast ? (
        <div>
          <AppText text={`Forecast for ${city.name}`} style="title" />
          <AppText
            text={`Temperature: ${currentForecast.main.temp}`}
            style="regular"
          />
          <AppText
            text={`Humidity: ${currentForecast.main.humidity}`}
            style="regular"
          />
        </div>
      ) : (
        !isLoading && (
          <AppText text={`No forecast available :(`} style="title" />
        )
      )}
    </div>
  );
}

export default CityForecastPage;
