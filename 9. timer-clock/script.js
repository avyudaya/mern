let timeInMin = prompt("Enter time in minutes:");
timeInMin = Number(timeInMin);

if (isNaN(timeInMin)) {
  alert("Please enter a number");
} else {
  // 1.  change to seconds
  timeInMin = Math.floor(timeInMin * 2);
  let timer = setInterval(() => {
    // 2. decrease time
    timeInMin -= 1;
    document.getElementById("clock").innerHTML = timeInMin;
    console.log(timeInMin);
    // 3. check if time is up and clear the interval
    if(timeInMin === 0){
        alert("Times up")
        clearInterval(timer)
    }
  }, 1000);
}
