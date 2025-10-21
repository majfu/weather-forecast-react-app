interface AppButtonProps {
  text: string;
}

function AppButton({ text }: AppButtonProps) {
  return (
    <button className="bg-sky-950 text-white w-50 h-20 rounded-3xl text-2xl font-mono hover:bg-sky-900 hover:cursor-pointer">
      {text}
    </button>
  );
}

export default AppButton;
