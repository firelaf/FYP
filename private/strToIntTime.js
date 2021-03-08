module.exports = (time) => {
  let splitTime = time.split(":");
  let parsedTime = [];
  let finalTime = 0;

  for (let i = 0; i < 2; i++) {
    parsedTime[i] = parseInt(splitTime[i]);
    if (i === 1) {
      parsedTime[i] = parsedTime[i] / 60;
    }
    finalTime += parsedTime[i];
  }
  return finalTime;
};
