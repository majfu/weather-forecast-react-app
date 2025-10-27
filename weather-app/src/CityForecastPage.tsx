import { Link, useLocation } from "react-router-dom";
import type { CityForecastSearch } from "./model/CityForecastSearch";
import { useEffect, useState } from "react";
import { getCurrentForecast } from "./AppService";
import type { CityForecast } from "./model/CityForecast";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import AppText from "./components/AppText/AppText";
import UnitChoiceGrid from "./components/UnitChoiceGrid/UnitChoiceGrid";
import Favorite from "./components/Favorite/Favorite";
import type { City } from "./model/City";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";

function CityForecastPage() {
  const location = useLocation();
  const city = location.state?.city;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const unitPreference = useSelector(
    (state: RootState) => state.unitPreference
  );
  const [isFavorite, setIsfavorite] = useState<boolean>(false);

  const [currentForecast, setCurrentForecast] = useState<CityForecast>();
  const cityForecastSearchParams: CityForecastSearch = {
    lat: city?.lat,
    lon: city?.lon,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: unitPreference,
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
  }, [unitPreference]);

  useEffect(() => {
    getForecast();
    setIsfavorite(
      getCurrentFavorites().some((favorite) => isTheSameCity(favorite, city))
    );
  }, []);

  useEffect(() => {
    const currentFavorites = getCurrentFavorites();

    const updatedFavorites = isFavorite
      ? currentFavorites.some((favorite) => isTheSameCity(favorite, city))
        ? currentFavorites
        : [...currentFavorites, city]
      : currentFavorites.filter((fav) => !isTheSameCity(fav, city));

    localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
  }, [isFavorite]);

  const getCurrentFavorites = (): City[] => {
    const storedFavorites = localStorage.getItem("favoritesList");
    return storedFavorites ? (JSON.parse(storedFavorites) as City[]) : [];
  };

  const isTheSameCity = (city: City, cityToCompare: City): boolean => {
    return city.lat == cityToCompare.lat && city.lon == cityToCompare.lon;
  };

  // A note about what needs to be diplayed here ;) temporary
  // bieżące warunki pogodowe (w formie odpowiedniej ikony),
  // prawdopodobieństwo wystąpienia opadów (wyrażona w procentach),
  // ich rodzaj oraz ilość (wyrażona w milimetrach na metr kwadratowy), prędkość i kierunek wiatru,
  // stopień zachmurzenia.
  // prognozowana temperatura i warunki pogodowe na najbliższe 5 dni,

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
            <div onClick={() => setIsfavorite(!isFavorite)}>
              <Favorite isFavorite={isFavorite} />
            </div>
            <UnitChoiceGrid />
          </div>
          <AppText text={`Forecast for ${city.name}`} style="title" />
          <AppText text="Current weather outside is" style="header" />
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
