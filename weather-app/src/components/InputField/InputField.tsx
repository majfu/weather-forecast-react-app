interface InputFieldProps {
  placeholderText: string;
}

function InputField({ placeholderText }: InputFieldProps) {
  return (
    <input
      className="bg-white w-200 h-30 text-4xl text-gray-400 p-5 rounded-3xl border-3 border-black text-center"
      placeholder={placeholderText}
    ></input>
  );
}

export default InputField;
