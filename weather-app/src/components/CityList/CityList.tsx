import type { City } from "../../model/City";
import type { CityForecastSearch } from "../../model/CityForecastSearch";

interface CityListProps {
  cityList: City[];
}

function CityList({ cityList }: CityListProps) {
  const showForecastForCity = async (city: City) => {
    const cityForecastSearchParams: CityForecastSearch = {
      lat: city.lat,
      lon: city.lon,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: "standard",
    };
  };

  return (
    <div className="grid grid-cols-1 gap-3 font-mono text-4xl">
      {cityList.map((city) => (
        <div
          onClick={() => showForecastForCity(city)}
          className="w-250 h-20 bg-sky-200 text-sky-950 hover:bg-sky-950 hover:text-white hover:cursor-pointer rounded-lg grid place-items-center"
        >
          {city.state
            ? `${city.name}, ${city.state}, ${city.country}`
            : `${city.name}, ${city.country}`}
        </div>
      ))}
    </div>
  );
}

export default CityList;
