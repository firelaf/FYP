import React, { useRef, useEffect, useState } from "react";
import Cell from "./subcomponents/Cell";
import Event from "./subcomponents/Event";
import DateNav from "./DateNav";

// let shifts = [
//   { startTime: "7:30", endTime: "8:30", session_id: "0", date: "2021-04-30" },
//   { startTime: "9:45", endTime: "12:00", session_id: "1", date: "2021-04-29" },
// ];

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

const Calendar = (props) => {
  const firstCell = useRef();
  const lastCell = useRef();
  let cellPos = useRef({
    first: 0,
    last: 0,
  });

  const [cellsRendered, toggleCellsRendered] = useState(false);

  let lineTimer = useRef();
  const [lineOffset, changeOffset] = useState("0");
  const [displayLine, toggleLine] = useState("inline");

  const [calendarDate, updateDate] = useState(new Date());

  const [shifts, updateShifts] = useState([]);
  let availabilityJSON = useRef([]);
  let requestsJSON = useRef([]);

  function initialCellsRender() {
    if (!cellsRendered) {
      toggleCellsRendered(true);
      cellPos.current = {
        first: firstCell.current.offsetTop,
        last: lastCell.current.offsetTop,
      };
    }

    if (
      new Date(calendarDate).getDate() === new Date().getDate() &&
      new Date(calendarDate).getMonth() === new Date().getMonth() &&
      new Date(calendarDate).getFullYear() === new Date().getFullYear()
    )
      toggleLine("inline");
    else toggleLine("none");
  }

  useEffect(() => {
    initialCellsRender();
  });

  useEffect(() => {
    updateShifts(
      buildEvents(availabilityJSON.current, "availability").concat(
        buildEvents(requestsJSON.current, "shift")
      )
    );
    // eslint-disable-next-line
  }, [calendarDate]);

  useEffect(() => {
    changeOffset(
      calculatePosition(
        cellPos.current.first,
        cellPos.current.last,
        calendarDate.getHours(),
        calendarDate.getMinutes()
      )
    );
    updateLine();
    requestEvents();
    return () => clearTimeout(lineTimer.current);
    // eslint-disable-next-line
  }, []);

  async function requestEvents() {
    let availability;
    let requests;
    availability = await fetch("http://localhost:5000/database/availability", {
      mode: "cors",
      credentials: "include",
      method: "GET",
    });
    availability = await availability.json();
    availabilityJSON.current = availability;
    updateShifts(buildEvents(availabilityJSON.current, "availability"));
    requests = await fetch("http://localhost:5000/database/requests", {
      mode: "cors",
      credentials: "include",
      method: "GET",
    });
    requests = await requests.json();
    requestsJSON.current = requests;
    updateShifts((prev) => {
      return prev.concat(buildEvents(requestsJSON.current, "shift"));
    });
  }

  function buildEvents(shiftsArray, eventType) {
    return shiftsArray.map((item) => {
      let startTimeParsed = ["", ""];
      let endTimeParsed = ["", ""];
      if (item !== undefined || null) {
        startTimeParsed =
          eventType === "availability"
            ? item.unavailableFrom.split(":")
            : item.startTime.split(":");
        endTimeParsed =
          eventType === "availability"
            ? item.unavailableTo.split(":")
            : item.endTime.split(":");
      }

      return item !== null || undefined ? (
        <Event
          key={item.session_id.toString()}
          startTime={`${startTimeParsed[0]}:${startTimeParsed[1]}`}
          endTime={`${endTimeParsed[0]}:${endTimeParsed[1]}`}
          date={
            new Date(
              eventType === "availability"
                ? item.availableDate
                : item.requestDate
            )
          }
          calendarDate={calendarDate}
          type={eventType}
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
      ) : null;
    });
  }

  //Recursive function which updates the position of the red time indicator
  //every minute
  function updateLine() {
    lineTimer.current = setTimeout(() => {
      const DT = new Date();
      console.log("updated line");

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
      <DateNav
        changeDate={(date) => {
          updateDate(new Date(date));
        }}
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
      {shifts}
    </div>
  );
};

export default Calendar;
