import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("[data-start]");
const daysDisplay = document.querySelector("[data-days]");
const hoursDisplay = document.querySelector("[data-hours]");
const minutesDisplay = document.querySelector("[data-minutes]");
const secondsDisplay = document.querySelector("[data-seconds]");

let countdownInterval;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const datetimePicker = document.querySelector("#datetime-picker");
flatpickr(datetimePicker, options);

startBtn.addEventListener("click", () => {
  if (selectedDate) {
    startCountdown();
    startBtn.disabled = true;
  }
});

function startCountdown() {
  countdownInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
  const diff = selectedDate.getTime() - new Date().getTime();
  
  if (diff <= 0) {
    clearInterval(countdownInterval);
    startBtn.disabled = false;
    resetTimerDisplay();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);
  
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

function resetTimerDisplay() {
  daysDisplay.textContent = "00";
  hoursDisplay.textContent = "00";
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
