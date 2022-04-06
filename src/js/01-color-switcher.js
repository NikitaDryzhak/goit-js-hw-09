const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')

let timerId = null

startBtn.addEventListener('click', changeColor);

stopBtn.disabled = true

function changeColor() {
timerId = setInterval(() => {
            body.style.backgroundColor = getRandomHexColor()
}, 1000)
    stopBtn.disabled = false
    startBtn.disabled = true
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.addEventListener('click', stopChangeColor)
function stopChangeColor() {
    clearInterval(timerId)
    startBtn.disabled = false
    stopBtn.disabled = true
}




