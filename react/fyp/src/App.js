import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useState } from "react";
import CstAppBar from "./components/CstAppBar.jsx";
import LoginForm from "./components/LoginForm";
import Schedule from "./components/Schedule";
import SlideMenu from "./components/SlideMenu";

//import { useHistory } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <CstAppBar />
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/dashboard/schedule">
            <Schedule />
          </Route>
          <Route path="/slide">
            <SlideMenu />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
