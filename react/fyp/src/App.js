import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import CstAppBar from "./components/CstAppBar";
import LoginForm from "./components/LoginForm";
import Schedule from "./components/Schedule";

import { useHistory } from "react-router-dom";

function App() {
  let [appBarProps, updateAppBar] = useState({
    menuIcon: true,
    label: "Schedule",
  });

  return (
    <>
      <CstAppBar menuIcon={appBarProps.menuIcon} label={appBarProps.label} />
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route exact path="/dashboard/worker/schedule">
            <Schedule />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
