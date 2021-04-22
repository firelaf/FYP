import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Avatar, CardActionArea } from "@material-ui/core";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Event = () => {
  return (
    <div style={{ width: "70vw" }}>
      <Card style={{ backgroundColor: "#ffc4ff", borderBottom: "15px" }}>
        <CardContent>
          <Typography variant="h5">7:30 - 8:45</Typography>
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
                variant="circle"
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
            <ChevronRightIcon style={{ color: "#9c64a6" }} fontSize="large" />
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
