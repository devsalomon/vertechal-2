import document from "document";

let time_label = document.getElementById("time-text");
let ampm_label = document.getElementById("ampm-text");
let date_label = document.getElementById("date-text");

// Month and weekday arrays for date label 
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const weekdays = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];

// Add zero in front of numbers < 10
function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

// Center aligns time 
// sets specific x pixel data based on time digits
// Problem: '1' digit causes alignment to mess up 
function centerAlignTime(hours, mins, ampm)
{
  if(ampm != "") // 12h formatting
  {
    let time_digits = [0, 0, 0, 0];  // [hr1, hr2, min1, min2]
    let count_ones  = 0;  
    let px_value    = 0;
  
    // get individual hour digits
    time_digits[0] = Math.floor((hours/10) % 10);
    time_digits[1] = hours % 10;
  
    // get individual min digits
    time_digits[2] = Math.floor(mins/10);  
    time_digits[3] = mins % 10; 
  
    // count digits that are '1'
    for(let i = 0; i < 4; i++){
      if (time_digits[i] == 1){count_ones++;}  
    }
  
    if (hours < 10)       // 1 digit hour (ex: 7:45)
    {
      switch (count_ones){
        case 0: px_value = 270; break;
        case 1: px_value = 264; break;
        case 2: px_value = 255; break;
        case 3: px_value = 248; break;
      }
    }
    else if (hours >= 10)  // 2 digit hour (ex: 12:45)
    {
      switch (count_ones){
        case 1: px_value = 280; break;
        case 2: px_value = 275; break;
        case 3: px_value = 265; break;
        case 4: px_value = 255; break;
      }
    }
  }
  else{ // 24h formatting
    px_value = 239;
    time_label.textAnchor = "middle";
  }

  // final alignment
  time_label.x = px_value;
  ampm_label.x = px_value;
}

export function setTime(clock_display, evt)
{
  let today = evt.date;
  let hours = today.getHours();
  let mins = zeroPad(today.getMinutes());
  let ampm = "";

  if (clock_display === "12h") {
    // 12h format
    ampm = hours < 12? "AM": "PM";
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  
  centerAlignTime(hours, mins, ampm);
  time_label.text = `${hours}:${mins}`;
  ampm_label.text = ampm;  
}

export function setDate(evt)
{
  let today = evt.date;
  let weekday = weekdays[today.getDay()];
  let month = months[today.getMonth()];

  date_label.text = `${weekday} ${month} ${today.getDate()}`;  
}