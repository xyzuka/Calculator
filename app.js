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

// 3. Takes the current display value and splits the comma and joins the numbers, so parseFloat can read the number without a comma and have toLocaleString add a comma 
const getValueAsString = () => valueEl.textContent.split(',').join('');

// 5. Function to convert string to value (debugging decimal bug) - also to update valueEl
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

// 4. Event listener for decimal
decimalEl.addEventListener('click', () => {
    const currentValueString = getValueAsString();
    if (!currentValueString.includes('.')) {
        setStringAsValue(currentValueString + '.'); //valueString 
    }
})

// 10. Converting the current display from string to numbers so operators can work
const getValueAsNumber = () => {
    return parseFloat(getValueAsString());
}

// 9. Applying newString with stringInMemory with its operator
const getResult = () => {
    const currentValueNumber = getValueAsNumber(); // converted display as number
    const valueNumberInMemory = parseFloat(valueStringInMemory); // changing string in memory to a number
    let newValueNumber; // initializing the result of operations
    if (operatorInMemory === 'addition') {
        newValueNumber = valueNumberInMemory + currentValueNumber;
    } else if (operatorInMemory === 'subtraction') {
        newValueNumber = valueNumberInMemory - currentValueNumber;
    } else if (operatorInMemory === 'multiplication') {
        newValueNumber = valueNumberInMemory * currentValueNumber;
    } else if (operatorInMemory === 'division') {
        newValueNumber = valueNumberInMemory / currentValueNumber;
    }
    return newValueNumber.toString();
}

// 8. Variables
let valueStringInMemory = null;
let operatorInMemory = null;

// 7. Function for operators
const handleOperatorClick = (operation) => {
    const currentValueString = getValueAsString();

    if (!valueStringInMemory) {
        valueStringInMemory = currentValueString;
        operatorInMemory = operation;
        // ** need to figure out how to display the current string 
        setStringAsValue('1');
        return;
    }

    // saving new string alongside previous stingInMemory
    valueStringInMemory = getResult();
    operatorInMemory = operation;
    setStringAsValue('1'); // *** DEBUG
}

// 6. Adding event listeners to functions
acEl.addEventListener('click', () => {
    let stringInMemory = null;
    let operatorInMemory = null;
    valueEl.textContent = '0'; // *** DEBUG
})

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
})

multiplyEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
})

additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
})

subtractEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
})

// 11. Equal operator
equalEl.addEventListener('click', () => {
    if (valueStringInMemory) {
        setStringAsValue(getResult());
        valueStringInMemory = null;
        operatorInMemory = null;
    }
})

// 12. Delete key *** DEBUG
delEl.addEventListener('click', () => {
    valueEl.textContent = valueEl.textContent.toString().slice(0, -1);

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