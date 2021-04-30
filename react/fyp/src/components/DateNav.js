import React, { useState } from "react";
import { Paper, IconButton, Typography } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const DateNav = (props) => {
  const [date, updateDate] = useState(new Date());

  const changeDate = props.changeDate; //This is to make ESLINT shut up

  function handleDateUpdate(date, op) {
    let placeholder = new Date(date);
    if (op === "-")
      placeholder = placeholder.setDate(placeholder.getDate() - 1);
    else placeholder = placeholder.setDate(placeholder.getDate() + 1);
    updateDate(new Date(placeholder));
    changeDate(new Date(placeholder));
  }
  return (
    <div>
      <Paper
        variant="outlined"
        square
        style={{
          height: "10vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={() => {
            handleDateUpdate(new Date(date), "-");
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography>
          {new Date(date).getDate()}/{new Date(date).getMonth()}/
          {new Date(date).getFullYear()}
        </Typography>
        <IconButton
          onClick={() => {
            handleDateUpdate(new Date(date), "+");
          }}
        >
          <ArrowRightIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default DateNav;
