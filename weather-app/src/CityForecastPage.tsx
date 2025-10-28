import { Link, useLocation } from "react-router-dom";
import type { WeatherForecastSearch } from "./model/WeatherForecastSearch";
import { useEffect, useState } from "react";
import { getWeatherForecast } from "./AppService";
import {
  getWindSpeedUnit,
  windDegreesToDirection,
  type ForecastEntry,
  type WeatherForecast,
} from "./model/WeatherForecast";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import AppText from "./components/AppText/AppText";
import UnitChoiceGrid from "./components/UnitChoiceGrid/UnitChoiceGrid";
import Favorite from "./components/Favorite/Favorite";
import type { AppDispatch, RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { addCity, isInFavorites, removeCity } from "./app/FavoriteCitiesSlice";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import TimeStampGrid from "./components/TimeStampGrid/TimeStampGrid";

function CityForecastPage() {
  const location = useLocation();
  const city = location.state?.city;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const unitPreference = useSelector(
    (state: RootState) => state.unitPreference
  );
  const isFavorite = useSelector(isInFavorites(city));

  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>();
  const [currentForecast, setCurrentForecast] = useState<ForecastEntry>();
  const cityForecastSearchParams: WeatherForecastSearch = {
    lat: city?.lat,
    lon: city?.lon,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: unitPreference,
    cnt: 40,
  };

  const [timeStampIndex, setTimeStampIndex] = useState<number>(0);

  const getForecast = async () => {
    setIsLoading(true);

    try {
      const results = await getWeatherForecast(cityForecastSearchParams);
      setWeatherForecast(results);
      setCurrentForecast(results.list[timeStampIndex]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForecast();
  }, [unitPreference]);

  useEffect(() => {
    getForecast();
  }, []);

  useEffect(() => {
    setCurrentForecast(weatherForecast?.list[timeStampIndex]);
  }, [timeStampIndex]);

  const toggleFavorite = () => {
    if (isFavorite) dispatch(removeCity(city));
    else dispatch(addCity(city));
  };

  return (
    <div className="flex w-screen h-screen bg-sky-50 flex-col p-20 items-center">
      {isLoading && <LoadingOverlay />}
      {currentForecast ? (
        <div>
          <Link
            to="/"
            className="font-mono text-sky-950 text-xl font-semibold bg-sky-200 hover:bg-sky-950 hover:text-white rounded-lg p-5"
          >
            Go to Home Page
          </Link>
          <div className="flex mt-10">
            <div onClick={toggleFavorite}>
              <Favorite isFavorite={isFavorite} />
            </div>
            <UnitChoiceGrid />
          </div>

          <AppText text={`Forecast for ${city.name}`} style="title" />
          <AppText text="Current weather outside is" style="header" />
          <div className="flex flex-col items-center mb-15">
            <WeatherIcon iconCode={currentForecast.weather[0].icon} />
          </div>

          <AppText
            text={`Temperature: ${currentForecast.main.temp}`}
            style="regular"
          />
          <AppText
            text={`Humidity: ${currentForecast.main.humidity}`}
            style="regular"
          />
          <AppText
            text={`Precipitation probability: ${currentForecast.pop * 100} %`}
            style="regular"
          />
          {currentForecast.rain?.["3h"] && (
            <AppText
              text={`Rain: ${currentForecast.rain?.["3h"]} mm/h`}
              style="regular"
            />
          )}
          <AppText
            text={`Wind speed: ${currentForecast.wind.speed} ${getWindSpeedUnit(unitPreference)} in direction ${windDegreesToDirection(currentForecast.wind.deg)}`}
            style="regular"
          />
          <AppText
            text={`Cloudiness: ${currentForecast.clouds.all} %`}
            style="regular"
          />
          <TimeStampGrid setIndex={setTimeStampIndex} />
        </div>
      ) : (
        !isLoading && (
          <div className="text-center">
            <AppText text={`No forecast available :(`} style="title" />
            <Link
              to="/"
              className="font-mono text-sky-950 text-6xl font-semibold bg-sky-200 hover:bg-sky-950 hover:text-white rounded-lg p-5"
            >
              Go to Home Page
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default CityForecastPage;
