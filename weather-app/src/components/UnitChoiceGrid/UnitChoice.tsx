import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  metricUnit,
  imperialUnit,
  defaultUnit,
} from "../../app/UnitPreferenceSlice";

interface UnitChoiceProps {
  text: string;
  value: string;
}

function UnitChoice({ text, value }: UnitChoiceProps) {
  const dispatch = useDispatch<AppDispatch>();
  const unitPreference = useSelector(
    (state: RootState) => state.unitPreference
  );

  const setUnitPreference = () => {
    if (value === "metric") dispatch(metricUnit());
    else if (value === "imperial") dispatch(imperialUnit());
    else dispatch(defaultUnit());
  };

  const style =
    value == unitPreference
      ? "text-white bg-sky-950"
      : "text-sky-950 bg-sky-200 hover:text-white";

  return (
    <div
      onClick={setUnitPreference}
      className={`${style} hover:bg-sky-900 flex items-center justify-center w-20 h-16 rounded-lg cursor-pointer`}
    >
      <div>{text}</div>
    </div>
  );
}

export default UnitChoice;
