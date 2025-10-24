interface InputFieldProps {
  placeholderText: string;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

function InputField({
  placeholderText,
  userInput,
  setUserInput,
}: InputFieldProps) {
  return (
    <input
      className="bg-white w-200 h-30 text-4xl placeholder-gray-400 text-sky-950 p-5 rounded-3xl border-6 border-sky-950 text-center mb-15 font-mono hover:cursor-pointer hover:border-sky-900"
      placeholder={placeholderText}
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
    ></input>
  );
}

export default InputField;
