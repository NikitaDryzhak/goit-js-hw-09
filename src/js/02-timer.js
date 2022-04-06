import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')

startBtn.disabled = true;
let futureDay = null;
const options = {
    //Enables time picker
    enableTime: true,
    //Displays time picker in 24 hour mode without AM/PM 
    //selection when enabled.
    time_24hr: true,
    //Sets the initial selected date(s)
    defaultDate: new Date(),
    //Adjusts the step for the minute input (incl. scrolling)
    minuteIncrement: 1,
    onClose(selectedDates) {
        

        if (selectedDates[0] < new Date) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
            return
        }
        startBtn.disabled = false;
        startBtn.addEventListener('click', startTimer)

        futureDay = selectedDates[0]
        
    },
};
function startTimer() {
Notiflix.Notify.success(
  'The countdown has begun',
  {
    timeout: 2000,
  },
  );
  setInterval(() => {
                const timer = convertMs(futureDay - new Date)
                if (futureDay - new Date <= 0) {
                  clearInterval();
                  return;
              }
                updateClock(timer)
                startBtn.disabled = true;
                dataInput.disabled = true;
}, 1000)

        }

function updateClock({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
   

}
function addLeadingZero(value) {
   return String(value).padStart(2, '0')
} 
   
flatpickr(dataInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

