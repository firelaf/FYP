import React from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const CstAppBar = (props) => {
  let enabledIcon;
  if (props.menuIcon) enabledIcon = <MenuIcon />;
  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" disabled={!props.menuIcon}>
            {enabledIcon}
          </IconButton>
          <Typography variant="h6">{props.label}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

CstAppBar.defaultProps = {
  menuIcon: true,
};

export default CstAppBar;
