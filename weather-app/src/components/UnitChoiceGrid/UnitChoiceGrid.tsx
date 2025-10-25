import UnitChoice from "./UnitChoice";

interface UnitChoiceGridProps {
  unitPreference: string;
  setUnitPreference: React.Dispatch<React.SetStateAction<string>>;
}

function UnitChoiceGrid({
  unitPreference,
  setUnitPreference,
}: UnitChoiceGridProps) {
  return (
    <div className="flex justify-end w-full mb-20 gap-10 text-4xl font-mono font-extrabold">
      <UnitChoice
        text={"\u00B0C"}
        value="metric"
        unitPreference={unitPreference}
        setUnitPreference={setUnitPreference}
      />
      <UnitChoice
        text={"\u00B0F"}
        value="imperial"
        unitPreference={unitPreference}
        setUnitPreference={setUnitPreference}
      />
      <UnitChoice
        text={"\u00B0K"}
        value="default"
        unitPreference={unitPreference}
        setUnitPreference={setUnitPreference}
      />
    </div>
  );
}

export default UnitChoiceGrid;
