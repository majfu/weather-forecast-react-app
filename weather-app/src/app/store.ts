import { configureStore } from "@reduxjs/toolkit";
import unitPreferenceReducer, {
  type UnitPreferenceState,
} from "./UnitPreferenceSlice";
import type { City } from "../model/City";
import favoriteCitiesReducer from "./FavoriteCitiesSlice";

function loadUnitPreference() {
  const unitPreference = localStorage.getItem(
    "unitPreference"
  ) as UnitPreferenceState;
  return unitPreference ? unitPreference : "metric";
}

function saveUnitPreference(unitPreference: string) {
  localStorage.setItem("unitPreference", unitPreference);
}

function loadFavoriteCities() {
  const storedFavorites = localStorage.getItem("favoritesList");
  return storedFavorites ? (JSON.parse(storedFavorites) as City[]) : [];
}

function saveFavoriteCities(favoriteCities: City[]) {
  localStorage.setItem("favoritesList", JSON.stringify(favoriteCities));
}

const savedUnitPreference = loadUnitPreference();
const savedFavoriteCities = loadFavoriteCities();

export const store = configureStore({
  reducer: {
    unitPreference: unitPreferenceReducer,
    favoriteCities: favoriteCitiesReducer,
  },
  preloadedState: {
    unitPreference: savedUnitPreference,
    favoriteCities: savedFavoriteCities,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveUnitPreference(state.unitPreference);
  saveFavoriteCities(state.favoriteCities);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
