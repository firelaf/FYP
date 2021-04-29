import React from "react";
import { Paper, IconButton, Typography } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const DateNav = (props) => {
  //const [date, changeDate] = useState(new Date());

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
            props.decrement();
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography>
          {props.currentDate.getDate()}/{props.currentDate.getMonth() + 1}/
          {props.currentDate.getFullYear()}
        </Typography>
        <IconButton
          onClick={() => {
            props.increment();
          }}
        >
          <ArrowRightIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default DateNav;
