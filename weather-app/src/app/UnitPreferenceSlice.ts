import { createSlice } from "@reduxjs/toolkit";

export type UnitPreferenceState = "metric" | "imperial" | "default";

export const unitPreferenceSlice = createSlice({
  name: "unitPreference",
  initialState: "metric" as UnitPreferenceState,
  reducers: {
    metricUnit: () => "metric" as UnitPreferenceState,
    imperialUnit: () => "imperial" as UnitPreferenceState,
    defaultUnit: () => "default" as UnitPreferenceState,
  },
});

export const { metricUnit, imperialUnit, defaultUnit } =
  unitPreferenceSlice.actions;

export default unitPreferenceSlice.reducer;
