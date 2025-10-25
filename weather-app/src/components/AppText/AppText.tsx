interface AppTextProps {
  text: string;
  style: string;
}

function AppText({ text, style }: AppTextProps) {
  const styles = {
    title: "text-8xl font-extrabold mb-40",
    header: "text-6xl font-semibold mb-15",
    regular: "text-4xl mb-5",
  };
  // https://tailwindcss.com/docs/detecting-classes-in-source-files
  return (
    <div className={`${styles[style]} font-mono text-sky-950`}>{text}</div>
  );
}

export default AppText;
