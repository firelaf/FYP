import React, { useRef, useEffect, useState } from "react";
import Cell from "./subcomponents/Cell";
import Event from "./subcomponents/Event";

//Calculates how much an element should be offset based on time, so they appear
//correctly on the time graph
function calculatePosition(topLimit, bottomLimit, hours, minutes) {
  const range = bottomLimit - topLimit;
  const timeRange = 14;
  let processedTime = hours + minutes / 60;

  const position = (range * (processedTime - 7)) / timeRange;
  return String(Math.round(position + 2));
}

const Calendar = () => {
  const firstCell = useRef();
  const lastCell = useRef();
  const [offset, changeOffset] = useState("0");
  const [displayLine, toggleLine] = useState("inline");

  //This happens only once when the page is loaded
  useEffect(() => {
    const firstCellPos = firstCell.current.offsetTop;
    const lastCellPos = lastCell.current.offsetTop;
    const DT = new Date(2021, 4, 28, 13, 12, 0, 0); //CHANGE THIS!!!!!!!!
    updateLine(firstCellPos, lastCellPos);
    changeOffset(
      calculatePosition(
        firstCellPos,
        lastCellPos,
        DT.getHours(),
        DT.getMinutes()
      )
    );
    //eslint-disable-next-line
  }, []);

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
      console.log(DT);
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
          position: "relative",
          margin: "0",
          top: `${offset}px`,
          display: { displayLine },
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "5vw",
          position: "relative",
          top: "-266vw",
        }}
      >
        <Event />
      </div>
    </div>
  );
};

export default Calendar;
