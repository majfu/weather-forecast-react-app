interface UnitChoiceProps {
  text: string;
  style: string;
}

function UnitChoice({ text, style }: UnitChoiceProps) {
  const styles = {
    selected: "text-white bg-sky-950",
    notSelected: "text-sky-950 bg-sky-200 hover:text-white",
  };

  return (
    <div
      className={`${styles[style]} hover:bg-sky-900 flex items-center justify-center w-20 h-16 rounded-lg cursor-pointer`}
    >
      <div>{text}</div>
    </div>
  );
}

export default UnitChoice;
