import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Calendar from "./Calendar";

const Schedule = () => {
  const history = useHistory();

  const [userType, updateUserType] = useState(null);

  useEffect(() => {
    async function fetchIsAuth() {
      let response = await fetch("http://localhost:5000/login/isAuth", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      console.log(response.status);
      if (response.status !== 202) history.push("/");
      else {
        response = await response.text();
        // console.log(response);
        // eslint-disable-next-line
        updateUserType(response);
        console.log(response);
      }
    }
    fetchIsAuth();
  }, [history]);

  return (
    <div
      style={{
        marginTop: "10vh",
      }}
    >
      <h1>{userType}</h1>
      <h1>Schedule</h1>
      {userType && <Calendar userType={userType} />}
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
