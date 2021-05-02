const clock = document.querySelector(".timer");
const clockSwitch = document.querySelector(".clock-switch input");
const clockDate = document.querySelector(".date");

function formatTime(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

function formatHour(hour) {
  const checked = clockSwitch.getAttribute("checked");
  if (checked != null) {
    if (hour > 12) {
      return formatTime(hour - 12);
    }
  }
  return formatTime(hour);
}

function getClock() {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clock.innerText = `${formatHour(hour)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function getDay(day) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  clockDate.innerText = `${year}. ${month}. ${date}. ${getDay(day)}`;
}

function init() {
  getClock();
  getDate();
  setInterval(getClock, 1000);
  clockSwitch.addEventListener("click", function () {
    clockSwitch.toggleAttribute("checked");
  });
}

init();
