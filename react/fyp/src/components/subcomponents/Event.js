import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Typography,
  Avatar,
  CardActionArea,
  IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Event = (props) => {
  const theme = useTheme();
  useEffect(() => {
    console.log("rendered");
  });
  function displayControl(eventDate, calDate) {
    if (
      eventDate.getDate() === calDate.getDate() &&
      eventDate.getMonth() === calDate.getMonth() &&
      eventDate.getFullYear() === calDate.getFullYear()
    )
      return "flex";
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
      <Card style={{ backgroundColor: "#ffc4ff", width: "100%" }}>
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
            <IconButton>
              <ChevronRightIcon style={{ color: "#9c64a6" }} fontSize="large" />
            </IconButton>
          </div>
          <Typography variant="subtitle2">Placeholder Shift Details</Typography>
          <CardActionArea
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "0.5em",
            }}
          >
            <FiberSmartRecordIcon style={{ color: "red" }} fontSize="small" />
            <Typography style={{ color: "red" }}>Live Session</Typography>
          </CardActionArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Event;
