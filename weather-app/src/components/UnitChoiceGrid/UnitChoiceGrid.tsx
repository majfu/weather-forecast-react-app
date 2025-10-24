import UnitChoice from "./UnitChoice";

function UnitChoiceGrid() {
  return (
    <div className="flex justify-end w-full mb-20 gap-10 text-4xl font-mono font-extrabold">
      <UnitChoice text={"\u00B0C"} style="selected" />
      <UnitChoice text={"\u00B0F"} style="notSelected" />
      <UnitChoice text={"\u00B0K"} style="notSelected" />
    </div>
  );
}

export default UnitChoiceGrid;
