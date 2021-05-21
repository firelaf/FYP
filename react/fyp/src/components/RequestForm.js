import React, { useRef } from "react";

const RequestForm = (props) => {
  //Declare and initialise the variables
  const startTime = useRef();
  const endTime = useRef();
  const day = useRef();
  const month = useRef();
  const year = useRef();
  const practicalType = useRef();
  const noteTakingType = useRef();
  const details = useRef();

  let timeOptions = [];
  let dateOptions = [];
  let hour = 6;
  let minute = -15;
  //Iterate through all the possible times
  for (let i = 0; i < 49; i++) {
    //Every fourth iteration, increment the hour
    if (i % 4 === 0) {
      hour++;
    }

    //Every iteration, increment the minute by 15 and append a new
    //option to the HTML dropdown menu
    minute = minute + 15;
    if (minute > 45) minute = 0;
    let HHMM;
    if (minute !== 0) HHMM = `${hour}:${minute}`;
    else HHMM = `${hour}:00`;
    timeOptions.push(<option value={HHMM}>{HHMM}</option>);
  }

  for (let i = 1; i < 32; i++) {
    dateOptions.push(<option value={i}>{i}</option>);
  }

  console.log(props.userType);

  return (
    <div>
      <form action="http://localhost:5000/database/sendRequest" method="POST">
        <label htmlFor="startTime">Start Time</label>
        <select name="startTime" ref={startTime}>
          {timeOptions}
        </select>
        <br />
        <label htmlFor="endTime">End Time</label>
        <select name="endTime" ref={endTime}>
          {timeOptions}
        </select>
        <br />
        <label htmlFor="dateDay">Date:</label>
        <select name="day" ref={day}>
          {dateOptions}
        </select>
        <select name="month" id="monthDrop" ref={month}>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
        <select name="year">
          <option value="2021" ref={year}>
            2021
          </option>
        </select>

        <br />
        <br />

        {props.userType === "S" && (
          <div>
            <input type="checkbox" ref={practicalType} name="practical-type" />
            <label htmlFor="practical-type">Practical Support</label>

            <br />

            <input
              type="checkbox"
              ref={noteTakingType}
              name="note-taking-type"
            />
            <label htmlFor="note-taking-type">Note-Taking Support</label>

            <br />
            <br />

            <textarea
              style={{ maxWidth: "95vw", with: "100vw" }}
              name="details"
              ref={details}
              cols="53"
              rows="10"
              maxLength="1000"
              placeholder="Describe what you need help with..."
            ></textarea>
          </div>
        )}

        <br />

        <input type="submit" value="Request" />
      </form>
    </div>
  );
};

export default RequestForm;
