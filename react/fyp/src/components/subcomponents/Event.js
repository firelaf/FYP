import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Typography,
  Avatar,
  CardActionArea,
  IconButton,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  availability: {
    backgroundColor: "#a4a4a4",
  },
  shift: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

function timeToNum(time) {
  time = time.split(":");
  return +time[0] + +time[1] / 60;
}

function compareDates(date1, date2) {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
    return true;
  else return false;
}

const Event = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  useEffect(() => {
    checkLive();
  });

  let [liveSession, toggleLive] = useState(false);
  const currentTimeNum = timeToNum(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );

  function checkLive() {
    if (compareDates(new Date(props.date), new Date(props.calendarDate))) {
      if (
        timeToNum(props.startTime) <= currentTimeNum &&
        timeToNum(props.endTime) > currentTimeNum
      ) {
        toggleLive(true);
      }
    }
  }

  function displayControl(eventDate, calDate) {
    if (compareDates(new Date(eventDate), new Date(calDate))) return "flex";
    else return "none";
  }

  return (
    <div
      style={{
        display: `${displayControl(props.date, props.calendarDate)}`,
        justifyContent: "flex-end",
        width: "70vw",
        marginRight: "5vw",
        position: "absolute",
        top: `${props.offset}px`,
        height: `${props.bottom - props.offset}px`,
        right: "0%",
      }}
    >
      <Card
        className={
          props.type === "availability" ? classes.availability : classes.shift
        }
        style={{
          width: "100%",
        }}
      >
        <CardContent style={{ padding: "10px" }}>
          <Typography variant="h5">
            {props.startTime} - {props.endTime}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                // display: props.type === "shift" ? "flex" : "none",
                alignItems: "center",
              }}
            >
              <Avatar
                variant="circular"
                style={{
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "0.5em",
                }}
              >
                J
              </Avatar>
              <Typography>John Smith</Typography>
            </div>
            <IconButton
              style={{ display: props.type === "shift" ? "inline" : "none" }}
            >
              <ChevronRightIcon style={{ color: "#9c64a6" }} fontSize="large" />
            </IconButton>
          </div>
          <Typography
            style={{ display: props.type === "shift" ? "inline" : "none" }}
            variant="subtitle2"
          >
            Placeholder Shift Details
          </Typography>
          {props.type === "shift" ? (
            <CardActionArea
              style={{
                display: liveSession ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "0.5em",
              }}
            >
              <FiberSmartRecordIcon style={{ color: "red" }} fontSize="small" />
              <Typography style={{ color: "red" }}>Live Session</Typography>
            </CardActionArea>
          ) : (
            <Typography>Unavailable to work</Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Event;
