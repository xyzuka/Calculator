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
