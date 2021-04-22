import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    borderTop: "1px solid",
    borderColor: "rgb(163, 149, 149, 0.56)",
    height: "1.1em",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "left",
  },
});

const Cell = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div>{props.label}</div>
      </div>
      <div className={classes.root}></div>
      <div className={classes.root}></div>
      <div className={classes.root}></div>
    </>
  );
};

Cell.defaultProps = {
  label: "",
};

export default Cell;
