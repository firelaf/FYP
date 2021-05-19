import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  Checkbox,
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
  let closeRedirect = useRef("/dashboard/schedule");

  const checkbox1 = useRef();
  const checkbox2 = useRef();
  const [checkedBoxes, updateBoxes] = useState({
    checkbox1: true,
    checkbox2: false,
  });

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

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/schedule":
        updateBoxes({ checkbox1: false, checkbox2: false });
        break;
      case "/dashboard/schedule/s":
        updateBoxes({ checkbox1: true, checkbox2: false });
        break;
      case "/dashboard/schedule/a":
        updateBoxes({ checkbox1: false, checkbox2: true });
        break;
      case "/dashboard/schedule/s&a":
        updateBoxes({ checkbox1: true, checkbox2: true });
        break;
      default:
        updateBoxes({ checkbox1: false, checkbox2: false });
        break;
    }
  }, [drawerState, location.pathname]);

  function handleClose() {
    toggleDrawer(false);
    if (location !== closeRedirect) history.push(closeRedirect.current);
  }

  function handleCheckbox() {
    if (checkbox1.current.checked && checkbox2.current.checked) {
      closeRedirect.current = "/dashboard/schedule/s&a";
      updateBoxes({ checkbox1: true, checkbox2: true });
    } else if (checkbox1.current.checked) {
      closeRedirect.current = "/dashboard/schedule/s";
      updateBoxes({ checkbox1: true, checkbox2: false });
    } else if (checkbox2.current.checked) {
      closeRedirect.current = "/dashboard/schedule/a";
      updateBoxes({ checkbox1: false, checkbox2: true });
    } else {
      closeRedirect.current = "/dashboard/schedule";
      updateBoxes({ checkbox1: false, checkbox2: false });
    }
  }

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
        onClose={() => handleClose()}
        disableSwipeToOpen={disabled}
      >
        <List component="nav">
          <ListItem
            button
            selected
            style={{
              marginTop: "20vh",
            }}
            onClick={() => {
              redirectTo(history, "/dashboard/schedule");
              toggleDrawer(false);
            }}
          >
            <CalendarViewDayIcon />
            Schedule
          </ListItem>

          <ListItem>
            <Checkbox
              inputRef={checkbox1}
              onChange={() => handleCheckbox()}
              checked={checkedBoxes.checkbox1}
            />
            Shifts
          </ListItem>

          <ListItem>
            <Checkbox
              inputRef={checkbox2}
              onChange={() => handleCheckbox()}
              checked={checkedBoxes.checkbox2}
            />
            Availability
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
