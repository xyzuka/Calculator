'use strict';

// DOM Elements
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');

const valueEl = document.querySelector('.value');

const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');

const additionEl = document.querySelector('.addition');
const subtractEl = document.querySelector('.subtract');
const multiplyEl = document.querySelector('.multiply');
const divisionEl = document.querySelector('.division');

const acEl = document.querySelector('.ac');
const delEl = document.querySelector('.del');

const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El];
// Using an array so we can loop through the numbers when adding event listeners to avoid duplicate code

// Time functionality
const time = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(time, 1000);
time();

// Variables
let numberInMem = null;
let currentNum = '';
let operatorInMem = null;
let newSum = null;

// Functions for operators
const add = (numberInMem, currentNum) => {
  return numberInMem + currentNum;
}

const subtract = (numberInMem, currentNum) => {
  return numberInMem - currentNum;
}

const multiply = (numberInMem, currentNum) => {
  return numberInMem * currentNum;
}

const divide = (numberInMem, currentNum) => {
  return numberInMem / currentNum;
}

// Function to call operator
const operate = (operatorInMem, numberInMem, currentNum) => {
  numberInMem = Number(numberInMem);
  currentNum = Number(currentNum);
  switch (operatorInMem) {
    case '+':
      return add(numberInMem, currentNum);
    case '-':
      return subtract(numberInMem, currentNum);
    case '*':
      return multiply(numberInMem, currentNum);
    case '/':
      if (currentNum === 0) return null;
      else return divide(numberInMem, currentNum);
    default:
      return null;
  }
}

// Function to update display
const updateDisplay = (number) => {
  valueEl.textContent = number;
  // if (!operatorInMem) {
  //   valueEl.textContent += number;
  // } else {
  //   valueEl.textContent += number;
  // }

  // // **** I think the bug is coming from this 
  // if (operatorInMem && numberInMem) {
  //   valueEl.textContent = '';
  //   valueEl.textContent += numbber;
  // }
}

// Event listener for clicking numbers
numberElArray.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
})
const appendNumber = (number) => {
  if (valueEl.textContent === '0') {
    valueEl.textContent = '';
  }

  // if (!operatorInMem) {
  //   updateDisplay(number);
  //   numberInMem = parseFloat(valueEl.textContent);
  //   console.log(`num in mem: ${numberInMem}`);
    currentNum += number;
    updateDisplay(currentNum);
    console.log(`current no: ${currentNum}`);

}

// Decimal key
decimalEl.addEventListener('click', () => {
  if (!valueEl.textContent.includes('.')) {
    valueEl.textContent += '.';
  }
})

// Function called when user clicks an operator
function evaluate() {
  let sum = operate(operatorInMem, numberInMem, currentNum);
  updateDisplay(sum);
  console.log(`newSum: ${sum}`);
}

const operatorClicked = (operator) => {
  operatorInMem = operator;
  console.log(`operator clicked: ${operatorInMem}`);
  numberInMem = currentNum;
  currentNum = '';
  // let currentNum;
  // updateDisplay(numberInMem);

}

// Event listeners for operators
additionEl.addEventListener('click', () => {
  operatorClicked('+');
})

subtractEl.addEventListener('click', () => {
  operatorClicked('-');
})

multiplyEl.addEventListener('click', () => {
  operatorClicked('*');
})

divisionEl.addEventListener('click', () => {
  operatorClicked('/');
})

equalEl.addEventListener('click', () => {
  evaluate();
})











// Clear feature
acEl.addEventListener('click', () => {
  currentNum = ''
  numberInMem = ''
  operatorInMem = undefined;
  valueEl.textContent = '0';
})

// Delete feature
delEl.addEventListener('click', () => {
  if (valueEl.textContent) {
    valueEl.textContent = parseFloat(valueEl.textContent.slice(0, -1));

  }
})






































// // Keyboard functionality
// document.addEventListener('keydown', (e) => {
//     let keyCode = e.key;
//     console.log(keyCode);

// //    if (e.key === '1') {
// //        valueEl.textContent = '1';
// //    } else if (e.key === '2') {
// //        valueEl.textContent = '2';
// //    } else if (e.key === '3') {
// //        valueEl.textContent = '3';
// //    } else if (e.key === '4') {
// //        valueEl.textContent = '4';
// //    } else if (e.key === '5') {
// //        valueEl.textContent = '5';
// //    } else if (e.key === '6') {
// //        valueEl.textContent = '6';
// //    } else if (e.key === '7') {
// //        valueEl.textContent = '7';
// //    } else if (e.key === '8') {
// //        valueEl.textContent = '8';
// //    } else if (e.key === '9') {
// //        valueEl.textContent = '9';
// //    } else {
// //        valueEl.textContent = '0';
// //    }
// })
