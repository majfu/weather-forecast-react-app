import { Link, useLocation } from "react-router-dom";
import type { CityForecastSearch } from "./model/CityForecastSearch";
import { useEffect, useState } from "react";
import { getCurrentForecast } from "./AppService";
import type { CityForecast } from "./model/CityForecast";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import AppText from "./components/AppText/AppText";
import UnitChoiceGrid from "./components/UnitChoiceGrid/UnitChoiceGrid";

function CityForecastPage() {
  const location = useLocation();
  const city = location.state?.city;

  const [unitPreference, setUnitPreference] = useState(() => {
    return localStorage.getItem("unitPreference") || "metric";
  });

  useEffect(() => {
    getForecast();
  }, []);

  useEffect(() => {
    localStorage.setItem("unitPreference", unitPreference);
    getForecast();
  }, [unitPreference]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          <UnitChoiceGrid
            unitPreference={unitPreference}
            setUnitPreference={setUnitPreference}
          />
          <AppText text={`Forecast for ${city.name}`} style="title" />
          <AppText text="Current weather ouside is" style="header" />
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
