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
let stringInMemory = null;
let operatorInMemory = null;

// 4. Converting the current display from string to numbers so operators can work
const getValueAsNumber = () => {
    return parseFloat(getValueAsString());
}

// 3. Takes the current display value and splits the comma and joins the numbers, so parseFloat can read the number without a comma and have toLocaleString add a comma 
const getValueAsString = () => valueEl.textContent.split(',').join('');


// 6. Function to convert string to value (debugging decimal bug)
const setStringAsValue = (valueString) => {
    // check if the last valueString has a decimal
    if (valueString[valueString.length -1] === '.') {
        valueEl.textContent += '.';
        return;
    }

    // Debugging toLocaleString() decimal error; if there is a decimal -> split the whole number and convert it to a integer to add formatting concatenate it with a decimal and the decimalString
    const [wholeNumberString, decimalString] = valueString.split('.');
    if (decimalString) {
        valueEl.textContent = 
            parseFloat(wholeNumberString).toLocaleString() + '.' + decimalString;
    } else {
        valueEl.textContent = 
            parseFloat(wholeNumberString).toLocaleString();
    }
}

// 2. Takes the numberString clicked and concatenates it with the display string
const handleNumberClick = (numString) => {
    const currentValueString = getValueAsString();
    // Debug 1 - Removing 0 from the front 
    if (currentValueString === '0') {
        // valueEl.textContent = numString;
        // 6. Debugging decimal bug
        setStringAsValue(numString);
    } else {
        // valueEl.textContent = parseFloat(currentValueString + numString).toLocaleString();
        // 6. toLocaleString(); will only allow up to a third decimal
        setStringAsValue(currentValueString + numString);
    }
}

// 1. Event listener for numbers
for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString()); // converting the clicked number (i) to a string to be sent to (2.)
    })
}


// 5. Event listener for decimal
decimalEl.addEventListener('click', () => {
    const currentValueString = getValueAsString();
    if (!currentValueString.includes('.')) {
        setStringAsValue(currentValueString + '.'); //valueString 
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