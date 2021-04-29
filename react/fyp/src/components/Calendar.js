import React, { useRef, useEffect, useState } from "react";
import Cell from "./subcomponents/Cell";
import Event from "./subcomponents/Event";
import DateNav from "./DateNav";

let shifts = [
  { startTime: "7:30", endTime: "8:30", session_id: "0", date: "2021-04-28" },
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
  const [lineOffset, changeOffset] = useState("0");
  const [displayLine, toggleLine] = useState("inline");
  const [calendarDate, changeDate] = useState(new Date());
  let [renderEvents, changeEvents] = useState([]);

  //This happens only once when the page is loaded
  useEffect(() => {
    const firstCellPos = firstCell.current.offsetTop;
    const lastCellPos = lastCell.current.offsetTop;
    const DT = new Date();
    updateLine(firstCellPos, lastCellPos);
    if (DT.getHours() > 21 || DT.getHours() < 7) toggleLine("none");
    else toggleLine("inline");

    changeOffset(
      calculatePosition(
        firstCellPos,
        lastCellPos,
        DT.getHours(),
        DT.getMinutes()
      )
    );
    changeEvents(updateShifts(firstCellPos, lastCellPos));
    //ESLINT gives a warning in case of infinite loops.
    //I've chosen to ignore it since no infinite loops can
    //occur when only calling useEffect() once (empty array []).
    //eslint-disable-next-line
  }, []);

  function updateShifts(firstCellPos, lastCellPos) {
    console.log("shfits updated");
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
            firstCellPos,
            lastCellPos,
            +startTimeParsed[0],
            +startTimeParsed[1]
          )}
          bottom={calculatePosition(
            firstCellPos,
            lastCellPos,
            +endTimeParsed[0],
            +endTimeParsed[1]
          )}
        />
      );
    });
  }

  //Recursive function which updates the position of the red time indicator
  //every minute
  function updateLine(firstCellPos, lastCellPos) {
    setTimeout(() => {
      const DT = new Date();

      //Disables the rd time indicator if the time is outside of the possible
      //working hours
      if (DT.getHours() > 21 || DT.getHours() < 7) toggleLine("none");
      else toggleLine("inline");

      changeOffset(
        calculatePosition(
          firstCellPos,
          lastCellPos,
          DT.getHours(),
          DT.getMinutes()
        )
      );
      updateLine(firstCellPos, lastCellPos);
      console.log("updated line");
    }, 60000);
  }

  function incDate(currentDate) {
    let placeholder = new Date(currentDate);
    placeholder = placeholder.setDate(placeholder.getDate() + 1);
    changeDate(new Date(placeholder));
  }
  function decDate(currentDate) {
    let placeholder = new Date(currentDate);
    placeholder = placeholder.setDate(placeholder.getDate() - 1);
    changeDate(new Date(placeholder));
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
      <DateNav
        increment={() => incDate(calendarDate)}
        decrement={() => decDate(calendarDate)}
        currentDate={calendarDate}
      />
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
      {renderEvents}
    </div>
  );
};

export default Calendar;
