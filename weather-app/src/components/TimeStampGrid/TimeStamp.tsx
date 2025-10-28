interface TimeStampProps {
  date: string;
  hour: string;
}

function TimeStamp({ date, hour }: TimeStampProps) {
  return (
    <div className="flex flex-col bg-sky-200 text-center p-4 font-mono font-semibold border-5 border-sky-800 rounded-lg text-sky-950 hover:text-white hover:bg-sky-950 hover:border-sky-200 hover:cursor-pointer">
      <span className="text-xl">{date}</span>
      <span className="text-lg">{hour}</span>
    </div>
  );
}

export default TimeStamp;
