module.exports = (shift) => {
  const currentDT = new Date(); //Records the current Date/Time

  //The format of the time strings is "HH:MM". They are being split
  //into hours and minutes.
  startTimeSplit = shift.startTime.split(":");
  endTimeSplit = shift.endTime.split(":");

  //Date oject for the start of the shift
  shiftStart = new Date(
    shift.year,
    shift.month - 1,
    shift.day,
    startTimeSplit[0],
    startTimeSplit[1]
  );

  //Date object for the end of the shift
  shiftEnd = new Date(
    shift.year,
    shift.month - 1,
    shift.day,
    endTimeSplit[0],
    endTimeSplit[1]
  );

  //This checks if the submitted end of the shfit is before the
  //the start. It then checks if either the start or the end are
  //in the past or not.
  if (shiftStart < shiftEnd) {
    if (shiftStart < currentDT || shiftEnd < currentDT) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
