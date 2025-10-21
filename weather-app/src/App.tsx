import "./App.css";
import AppButton from "./components/AppButton/AppButton";
import AppText from "./components/AppText/AppText";
import InputField from "./components/InputField/InputField";

function App() {
  return (
    <div className="flex w-screen h-screen bg-sky-50 flex-col p-20 items-center">
      <AppText text="Weather Checker" style="title" />
      <AppText text="Choose a city:" style="header" />
      <InputField placeholderText="City name..."></InputField>
      <AppButton text="Go!"></AppButton>
    </div>
  );
}

export default App;
