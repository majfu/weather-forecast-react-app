import { useEffect, useRef, useState } from "react";
import "./App.css";
import AppButton from "./components/AppButton/AppButton";
import AppText from "./components/AppText/AppText";
import InputField from "./components/InputField/InputField";
import UnitChoiceGrid from "./components/UnitChoiceGrid/UnitChoiceGrid";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import type { City } from "./model/City";
import type { CitySearch } from "./model/CitySearch";
import { getCitySearchResults } from "./AppService";
import CityList from "./components/CityList/CityList";

function App() {
  const [cityInput, setCityInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResultsList, setSearchResultsList] = useState<City[]>([]);
  const [isCityNotFound, setIsCityNotFound] = useState<boolean>(false);
  const resultsEndRef = useRef<HTMLDivElement>(null);

  const [unitPreference, setUnitPreference] = useState(() => {
    return localStorage.getItem("unitPreference") || "metric";
  });

  const [favoriteCitiesList, setFavoriteCitiesList] = useState(() => {
    const storedFavorites = localStorage.getItem("favoritesList");
    return storedFavorites ? (JSON.parse(storedFavorites) as City[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("unitPreference", unitPreference);
  }, [unitPreference]);

  const citySearchParams: CitySearch = {
    q: cityInput,
    limit: 6,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
  };

  const searchForCities = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!cityInput.trim()) return;

    setIsLoading(true);

    try {
      const results = await getCitySearchResults(citySearchParams);
      setSearchResultsList(results);
      setIsCityNotFound(results.length == 0);
    } catch (error) {
      console.error(error);
      setIsCityNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resultsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [searchResultsList]);

  useEffect(() => {
    setIsCityNotFound(false);
  }, [cityInput]);

  return (
    <div className="flex w-screen h-screen bg-sky-50 flex-col p-20 items-center">
      {isLoading && <LoadingOverlay />}

      <UnitChoiceGrid
        unitPreference={unitPreference}
        setUnitPreference={setUnitPreference}
      />
      <AppText text="Weather Checker" style="title" />
      <AppText text="Choose a city:" style="header" />

      <form
        onSubmit={searchForCities}
        className="flex flex-col items-center mb-15"
      >
        <InputField
          placeholderText="City name..."
          userInput={cityInput}
          setUserInput={setCityInput}
        />
        <AppButton text="Go!" />
      </form>

      {searchResultsList.length != 0 && (
        <div className="flex flex-col items-center">
          <AppText text="Cities found:" style="header" />
          <CityList cityList={searchResultsList} />
          <div ref={resultsEndRef} />
        </div>
      )}

      {isCityNotFound == true && (
        <AppText text="Sorry, no city was found." style="header" />
      )}

      {favoriteCitiesList.length != 0 && (
        <div className="text-center mt-15">
          <AppText text="Your Favorites:" style="header" />
          <CityList cityList={favoriteCitiesList} />
          <div ref={resultsEndRef} />
        </div>
      )}
    </div>
  );
}

export default App;
