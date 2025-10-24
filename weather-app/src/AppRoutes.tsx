import { Routes, Route } from "react-router-dom";
import App from "./App";
import CityForecastPage from "./CityForecastPage.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/city-forecast" element={<CityForecastPage />} />
    </Routes>
  );
}
