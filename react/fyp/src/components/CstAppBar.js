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
import { useLocation } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";

//import CstDrawer from "./CstDrawer";

const CstAppBar = () => {
  let menuIcon;
  let disabled;
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
          <ListItem button selected>
            <CalendarViewDayIcon />
            Schedule
          </ListItem>
          <ListItem divider />
        </List>
      </SwipeableDrawer>
    </div>
  );
};

CstAppBar.defaultProps = {
  menuIcon: true,
};

export default CstAppBar;