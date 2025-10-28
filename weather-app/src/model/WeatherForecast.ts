import type { UnitPreferenceState } from "../app/UnitPreferenceSlice";

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: ForecastCity;
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
    temp_kf?: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h"?: number;
  };
  snow?: {
    "3h"?: number;
  };
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export function windDegreesToDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function getWindSpeedUnit(unitPreference: UnitPreferenceState) {
  if (unitPreference == "imperial") return "mph";
  return "m/s";
}

export function getTimeStamps(): Date[] {
  const numTimeStamps = 40;
  const timeStampStepInHours = 3;
  const nowTime = new Date();
  const timeStamps = [];

  for (let i = 0; i < numTimeStamps; i++) {
    const stamp = new Date(
      nowTime.getTime() + i * timeStampStepInHours * 60 * 60 * 1000
    );
    timeStamps.push(stamp);
  }
  return timeStamps;
}
