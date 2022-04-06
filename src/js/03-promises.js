import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]')
const step = document.querySelector('input[name="step"]')
const amount = document.querySelector('input[name="amount"]')
form.addEventListener('submit', onSubmitForm)


function onSubmitForm(e) {
  e.preventDefault();
  const data = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),

  }
  callPromiseCreation(data);
}

function callPromiseCreation({ delay, step, amount }) {
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
      }
    }, delay)
    })
}





