import React from "react";
import Cell from "./subcomponents/Cell";
import Event from "./subcomponents/Event";

const Calendar = () => {
  return (
    <div>
      <Cell label="7:00" />
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "5vw",
          position: "relative",
          top: "-266vw",
        }}
      >
        <Event></Event>
      </div>
    </div>
  );
};

export default Calendar;
