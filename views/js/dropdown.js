/*
This script handles all the numbered dropdowns in student.html
*/
let timeDropdown = document.querySelectorAll(".time-dropdown");

timeDropdown.forEach((item) => {
  //Declare and initialise the variables
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

    if (minute === 0) {
      item.innerHTML += `<option value="${hour}:00">${hour}:00</option>`;
    } else {
      item.innerHTML += `<option value="${hour}:${minute}">${hour}:${minute}</option>`;
    }
  }
});

let dayDropdown = document.querySelector("#day-dropdown");

for (let i = 1; i < 32; i++) {
  dayDropdown.innerHTML += `<option value="${i}">${i}</option>`;
}
