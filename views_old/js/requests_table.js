//Get the requests JSON data from from the server and arrange them in a table
function getRequests(uType) {
  let table = document.querySelector(".requests-table");

  //Fetch the requests from the server and read them as JSON
  fetch("/database/requests", { method: "POST" })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      //For each entry entry received from the server, arrange the data in the table
      resData.forEach((item) => {
        let dateObject = new Date(item.requestDate);

        let shiftType;
        if (item.practicalType && item.noteTakingType) {
          shiftType = "Practical and Note-Taking Support";
        } else if (item.practicalType && !item.noteTakingType) {
          shiftType = "Practical Support";
        } else if (!item.practicalType && item.noteTakingType) {
          shiftType = "Note-Taking Support";
        }

        let tableContents = `<td>${item.startTime}</td>
        <td>${item.endTime}</td>
        <td>${dateObject.getDate()}/${
          dateObject.getMonth() + 1
        }/${dateObject.getFullYear()}</td>
        <td>${item.assignedTo_id}</td>
        <td>${item.details}</td>
        <td>${shiftType}`;

        //If the request was made by an Admin, show the ID of the student who made the request
        if (uType === "A") {
          tableContents += `<td>${item.requester_id}</td>`;
        }
        //Make the changes to the HTML
        table.innerHTML += tableContents;
      });
    });
}

//TODO - REMOVE THE REPEATING CODE
function getAvailability(uType) {
  let table = document.querySelector(".availability-table");

  fetch("/database/availability", { method: "POST" })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      resData.forEach((item) => {
        let dateObject = new Date(item.availableDate);

        let tableContents = `<td>${item.unavailableFrom}</td>
                                   <td>${item.unavailableTo}</td>
                                   <td>${dateObject.getDate()}/${
          dateObject.getMonth() + 1
        }/${dateObject.getFullYear()}</td>`;
        if (uType === "A") {
          tableContents += `<td>${item.worker_id}</td>`;
        }

        table.innerHTML += tableContents;
      });
    });
}

//Gets the user type and then fetches either the requests or availability database based on the user type
async function getUserType() {
  let userType = await fetch("/session/userType", { method: "POST" });
  userType.text().then((uType) => {
    getRequests(uType);

    if (uType === "A" || uType === "W") {
      getAvailability(uType);
    }
  });
}

//Innitiates the whole process
getUserType();
