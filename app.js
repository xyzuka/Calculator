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

// Variables
let numberInMem = null;
let currentNum = '';
let operatorInMem = null;
let newValue = '';

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
      if (currentNum === 0) {
          alert('You cannot divide a number by 0!')
          reset();
      }
      else return divide(numberInMem, currentNum);
    default:
      return null;
  }
}

// Function to update display
const updateDisplay = (number) => {
  valueEl.textContent = number;
}

// Event listener for clicking numbers
numberElArray.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
})
const appendNumber = (number) => {
  if (valueEl.textContent === '0') {
    valueEl.textContent = '';
  }

    // concatenates numbers clicked
    currentNum += number;
    // updates display 
    updateDisplay(currentNum);
}

function appendPoint() {
    if (!valueEl.textContent.includes('.')) {
        valueEl.textContent += '.'
      } return currentNum = valueEl.textContent;
}

// Decimal key
decimalEl.addEventListener('click', () => {
    appendPoint();
})

// Function called when user clicks an operator
function evaluate() {
  let newValue = roundResult(operate(operatorInMem, numberInMem, currentNum));
  updateDisplay(newValue);
}

function roundResult(number) {
  return Math.round(number * 100) / 100
}

const operatorClicked = (operator) => {
    // for chaining operators when clicking
    if (currentNum && numberInMem && operatorInMem) {
        evaluate();
        numberInMem = valueEl.textContent;
        operatorInMem = operator;
        currentNum = ''
        return
    }

    operatorInMem = operator;
    numberInMem = currentNum;
    // empties the concatenated numbers
    currentNum = '';
    
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
  reset();
})
function reset() {
  currentNum = ''
  numberInMem = ''
  operatorInMem = undefined;
  valueEl.textContent = '0';
}

function deleteNumber() {
    if (numberInMem && operatorInMem && currentNum) {
        valueEl.textContent = valueEl.textContent.slice(0, -1);
        currentNum = valueEl.textContent;
        numberInMem = ''
        return
    }

    if (currentNum) {
        valueEl.textContent = valueEl.textContent.slice(0, -1);
        currentNum = valueEl.textContent;
        numberInMem = ''
        return
    }
}

// Delete feature
delEl.addEventListener('click', () => {
    deleteNumber();
})

// Keyboard support
window.addEventListener('keydown', handleKeyBoardInput)

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '*'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
}

function handleKeyBoardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') reset()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      operatorClicked(convertOperator(e.key))
}



































// Misc - Time functionality
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

