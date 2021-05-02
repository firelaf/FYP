import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

function redirectTo(history, path) {
  history.push(path);
}

function logOut(history) {
  fetch("http://localhost:5000/login/logout", {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      if (response === "logout_success") redirectTo(history, "/");
    });
}

const CstAppBar = () => {
  let menuIcon;
  let disabled;

  const history = useHistory();
  let location = useLocation();
  if (location.pathname !== "/") {
    menuIcon = <MenuIcon />;
    disabled = false;
  }

  let label;
  if (location.pathname === "/") {
    label = "Log In";
    disabled = true;
  }
  if (location.pathname.includes("schedule")) {
    label = "Schedule";
    disabled = false;
  }

  const [drawerState, toggleDrawer] = useState(false);

  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            disabled={disabled}
            onClick={() => toggleDrawer(true)}
          >
            {menuIcon}
          </IconButton>
          <Typography variant="h6">{label}</Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerState}
        onOpen={() => toggleDrawer(true)}
        onClose={() => toggleDrawer(false)}
        disableSwipeToOpen={disabled}
      >
        <List component="nav">
          <ListItem
            button
            selected
            onClick={() => {
              redirectTo(history, "/dashboard/schedule");
              toggleDrawer(false);
            }}
          >
            <CalendarViewDayIcon />
            Schedule
          </ListItem>
          <ListItem divider />
          <ListItem
            button
            onClick={() => {
              logOut(history);
              toggleDrawer(false);
            }}
          >
            <MeetingRoomIcon />
            Log Out
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

CstAppBar.defaultProps = {
  menuIcon: true,
};

export default CstAppBar;
