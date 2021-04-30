import React, { useRef, useEffect, useState } from "react";
import Cell from "./subcomponents/Cell";
import Event from "./subcomponents/Event";
import DateNav from "./DateNav";

let shifts = [
  { startTime: "7:30", endTime: "8:30", session_id: "0", date: "2021-04-30" },
  { startTime: "9:45", endTime: "12:00", session_id: "1", date: "2021-04-29" },
];

//Calculates how much an element should be offset based on time, so they appear
//correctly on the time graph
function calculatePosition(topLimit, bottomLimit, hours, minutes) {
  const range = bottomLimit - topLimit;
  const timeRange = 14;
  let processedTime = hours + minutes / 60;

  let position = (range * (processedTime - 7)) / timeRange;
  position = position + topLimit;
  return String(Math.round(position));
}

const Calendar = () => {
  const firstCell = useRef();
  const lastCell = useRef();
  let cellPos = useRef({
    first: 0,
    last: 0,
  });

  let [cellsRendered, toggleCellsRendered] = useState(false);

  const [lineOffset, changeOffset] = useState("0");
  const [displayLine, toggleLine] = useState("inline");
  let [calendarDate, updateDate] = useState(new Date());

  function initialCellsRender() {
    if (!cellsRendered) {
      toggleCellsRendered(true);
      cellPos.current = {
        first: firstCell.current.offsetTop,
        last: lastCell.current.offsetTop,
      };
      changeOffset(
        calculatePosition(
          cellPos.current.first,
          cellPos.current.last,
          calendarDate.getHours(),
          calendarDate.getMinutes()
        )
      );
    }

    if (new Date(calendarDate).getDate() === new Date().getDate())
      toggleLine("inline");
    else toggleLine("none");
  }

  useEffect(() => {
    initialCellsRender();
  });

  useEffect(() => {
    updateLine();
    // eslint-disable-next-line
  }, []);

  function buildEvents() {
    return shifts.map((item) => {
      const startTimeParsed = item.startTime.split(":");
      const endTimeParsed = item.endTime.split(":");
      return (
        <Event
          key={item.session_id}
          startTime={item.startTime}
          endTime={item.endTime}
          date={new Date(item.date)}
          calendarDate={calendarDate}
          offset={calculatePosition(
            cellPos.current.first,
            cellPos.current.last,
            +startTimeParsed[0],
            +startTimeParsed[1]
          )}
          bottom={calculatePosition(
            cellPos.current.first,
            cellPos.current.last,
            +endTimeParsed[0],
            +endTimeParsed[1]
          )}
        />
      );
    });
  }

  //Recursive function which updates the position of the red time indicator
  //every minute
  function updateLine() {
    setTimeout(() => {
      const DT = new Date();

      //Disables the rd time indicator if the time is outside of the possible
      //working hours
      if (DT.getHours() > 21 || DT.getHours() < 7) toggleLine("none");
      else toggleLine("inline");

      changeOffset(
        calculatePosition(
          cellPos.current.first,
          cellPos.current.last,
          DT.getHours(),
          DT.getMinutes()
        )
      );
      updateLine();
      console.log("updated line");
    }, 60000);
  }

  return (
    <div>
      <hr
        style={{
          color: "red",
          backgroundColor: "red",
          height: "2px",
          border: "none",
          position: "absolute",
          width: "100%",
          margin: "0",
          top: `${lineOffset}px`,
          display: `${displayLine}`,
        }}
      />
      <DateNav changeDate={(date) => updateDate(new Date(date))} />
      <Cell label="7:00" ref={firstCell} />
      <Cell label="8:00" />
      <Cell label="9:00" />
      <Cell label="10:00" />
      <Cell label="11:00" />
      <Cell label="12:00" />
      <Cell label="13:00" />
      <Cell label="14:00" />
      <Cell label="15:00" />
      <Cell label="16:00" />
      <Cell label="17:00" />
      <Cell label="18:00" />
      <Cell label="19:00" />
      <Cell label="20:00" />
      <div id="placeholder" ref={lastCell} />
      {buildEvents()}
    </div>
  );
};

export default Calendar;
