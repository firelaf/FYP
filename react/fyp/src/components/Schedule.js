import React from "react";
import Calendar from "./Calendar";

const Schedule = ({ history }) => {
  // fetch("http://localhost:5000/login/isAuth", { method: "GET" }).then(
  //   (response) => {
  //     //console.log(response);
  //   }
  // );
  return (
    <div
      style={{
        marginTop: "10vh",
      }}
    >
      <h1>Schedule</h1>
      {/* <button onClick={() => history.push("/")}>hey</button> */}
      <Calendar />
    </div>
  );
};

export default Schedule;
