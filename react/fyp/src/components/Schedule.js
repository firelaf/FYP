import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Calendar from "./Calendar";

const Schedule = () => {
  let history = useHistory();

  let [userType, updateUserType] = useState("unknown");

  useEffect(() => {
    // console.log("updated");
  }, [userType]);

  useEffect(() => {
    fetch("http://localhost:5000/login/isAuth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        // console.log(response);
        // eslint-disable-next-line
        updateUserType((userType = response));
      });
  }, []);

  function logOut() {
    fetch("http://localhost:5000/login/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    history.push("/");
  }

  return (
    <div
      style={{
        marginTop: "10vh",
      }}
    >
      <h1>{userType}</h1>
      <h1>Schedule</h1>
      <button onClick={logOut}>log out</button>
      <Calendar />
      <Fab
        size="large"
        style={{ position: "fixed", bottom: "30px", right: "30px" }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Schedule;
