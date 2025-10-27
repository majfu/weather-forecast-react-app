import { configureStore } from "@reduxjs/toolkit";
import unitPreferenceReducer, {
  type UnitPreferenceState,
} from "./UnitPreferenceSlice";

function loadUnitPreference() {
  const unitPreference = localStorage.getItem(
    "unitPreference"
  ) as UnitPreferenceState;
  if (unitPreference == null) {
    return "metric";
  }
  return unitPreference;
}

function saveUnitPreference(unitPreference: string) {
  localStorage.setItem("unitPreference", unitPreference);
}

const savedUnitPreference = loadUnitPreference();

export const store = configureStore({
  reducer: {
    unitPreference: unitPreferenceReducer,
  },
  preloadedState: {
    unitPreference: savedUnitPreference,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveUnitPreference(state.unitPreference);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
