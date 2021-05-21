import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Calendar from "./Calendar";
import SlideMenu from "./SlideMenu";

const Schedule = () => {
  const history = useHistory();

  const [userType, updateUserType] = useState(null);
  const [userTypeStr, updateUserTypeStr] = useState("");

  useEffect(() => {
    async function fetchIsAuth() {
      let response = await fetch("http://localhost:5000/login/isAuth", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (response.status !== 202) history.push("/");
      else {
        response = await response.text();
        switch (response) {
          case "W":
            updateUserTypeStr("Worker");
            break;
          case "S":
            updateUserTypeStr("Student");
            break;
          case "A":
            updateUserTypeStr("Admin");
            break;
          default:
            updateUserTypeStr("");
            break;
        }
        updateUserType(response);
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
      <h1>{userTypeStr}</h1>
      {userType && <Calendar userType={userType} />}
      <SlideMenu userType={userType} />
    </div>
  );
};

export default Schedule;
