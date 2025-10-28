import type { Dispatch, SetStateAction } from "react";
import { getTimeStamps } from "../../model/WeatherForecast";
import TimeStamp from "./TimeStamp";

interface TimeStampGridProps {
  setIndex: Dispatch<SetStateAction<number>>;
}

function TimeStampGrid({ setIndex }: TimeStampGridProps) {
  const timeStamps = getTimeStamps();

  return (
    <div className="grid grid-cols-8 mb-20 mt-20 gap-x-4 gap-y-10">
      {timeStamps.map((timeStamp, index) => {
        const date = `${timeStamp.getDate()}.${timeStamp.getMonth() + 1}`;
        const hour = `${timeStamp.getHours()}:${timeStamp.getMinutes().toString().padStart(2, "0")}`;
        return (
          <div onClick={() => setIndex(index)}>
            <TimeStamp date={date} hour={hour} />
          </div>
        );
      })}
    </div>
  );
}

export default TimeStampGrid;
