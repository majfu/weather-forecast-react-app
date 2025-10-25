interface UnitChoiceProps {
  text: string;
  value: string;
  unitPreference: string;
  setUnitPreference: React.Dispatch<React.SetStateAction<string>>;
}

function UnitChoice({
  text,
  value,
  unitPreference,
  setUnitPreference,
}: UnitChoiceProps) {
  const style =
    value == unitPreference
      ? "text-white bg-sky-950"
      : "text-sky-950 bg-sky-200 hover:text-white";

  return (
    <div
      onClick={() => setUnitPreference(value)}
      className={`${style} hover:bg-sky-900 flex items-center justify-center w-20 h-16 rounded-lg cursor-pointer`}
    >
      <div>{text}</div>
    </div>
  );
}

export default UnitChoice;
