import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { City } from "../model/City";
import type { RootState } from "./store";

export const isTheSameCity = (city: City, cityToCompare: City): boolean => {
  return city.lat == cityToCompare.lat && city.lon == cityToCompare.lon;
};

export const isInFavorites = (city: City) => (state: RootState) =>
  state.favoriteCities.some((favorite) => isTheSameCity(favorite, city));

const initialState: City[] = [];

export const favoriteCitiesSlice = createSlice({
  name: "favoriteCities",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      const isInFavorites = state.some((favorite) =>
        isTheSameCity(favorite, action.payload)
      );
      if (isInFavorites) return;
      state.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<City>) => {
      return state.filter(
        (favorite) => !isTheSameCity(favorite, action.payload)
      );
    },
  },
});

export const { addCity, removeCity } = favoriteCitiesSlice.actions;

export default favoriteCitiesSlice.reducer;
