import React from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const CstAppBar = () => {
  let menuIcon;
  let disabled;
  let location = useLocation();
  if (location.pathname !== "/") {
    menuIcon = <MenuIcon />;
    disabled = false;
  }

  let label;
  if (location.pathname === "/") label = "Log In";
  if (location.pathname.includes("schedule")) label = "Schedule";

  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" disabled={disabled}>
            {menuIcon}
          </IconButton>
          <Typography variant="h6">{label}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

CstAppBar.defaultProps = {
  menuIcon: true,
};

export default CstAppBar;
