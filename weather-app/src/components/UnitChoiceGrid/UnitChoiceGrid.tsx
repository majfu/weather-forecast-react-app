import UnitChoice from "./UnitChoice";

function UnitChoiceGrid() {
  return (
    <div className="flex justify-end w-full mb-20 gap-10 text-4xl font-mono font-extrabold">
      <UnitChoice text={"\u00B0C"} value="metric" />
      <UnitChoice text={"\u00B0F"} value="imperial" />
      <UnitChoice text={"\u00B0K"} value="standard" />
    </div>
  );
}

export default UnitChoiceGrid;
