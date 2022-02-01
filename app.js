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

// Variables in initial state
let valueStringInMemory = null;
let operatorInMemory = null;

// Time setup
// Function to update time and change hour and minute text
const updateTime = () => {
    const currentTime = new Date();
    
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    
    if (currentHour > 12) {
        currentHour -= 12;
    }

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0'); //if the set max length is not 2, then we will pad a 0 in the start
}

// Runs the update time function every second
setInterval(updateTime, 1000);
updateTime();

// Functions
const getValueAsString = () => {
    const currentValueString = valueEl.textContent;
    return currentValueString.split(',').join(''); // splitting the display strings if there is a comma and joining it back together
}

const getValueAsNumber = () => {
    return parseFloat(getValueAsString()); // converting string to a number
}

// Converts the string entered in a value
const setStringAsValue = (valueString) => {

    // Checking if last value entered was decimal, if so, it will add a period to our current display
    if (valueString[valueString.length -1] === '.') {
        valueEl.textContent += '.';
        return;
    }

    // If there is a decimal string -> the wholeNumberString will be split and joined together with the decimalString
    const [wholeNumberString, decimalString] = valueString.split('.'); 
    if (decimalString) {
        valueEl.textContent = 
            parseFloat(wholeNumberString).toLocaleString() + '.' + decimalString;
    } else {
        valueEl.textContent = parseFloat(wholeNumberString).toLocaleString();
    }
}

const handleNumberClick = (numString) => {
    const currentValueString = getValueAsString();
    // removing zero from the front
    if (currentValueString === '0') {
        setStringAsValue(numString);
    } else {
        // adds a comma for thousands
        setStringAsValue(currentValueString + numString);
    }
}

// Adding event listeners to numbers
for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString()); // converting the clicked number to a string
    })
}
// Event listeners for decimals
decimalEl.addEventListener('click', () => {
    const currentValueString = getValueAsString();
    // prevents adding more than 1 decimal
    if (!currentValueString.includes('.')) {
        setStringAsValue(currentValueString + '.');
    }
})

// Operator function
const getResultOfOperationAsString = () => {
    const currentValueNumber = getValueAsNumber();
    const valueNumberInMemory = parseFloat(valueStringInMemory);
    let newValueNumber;
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

// When user clicks an operator
const handleOperatorClick = (operation) => {
    const currentValueString = getValueAsString();

    if (!valueStringInMemory) {
        valueStringInMemory = currentValueString; // Store currentValueString in memory
        operatorInMemory = operation; // Store operator in memory
        setStringAsValue('0'); // Resets the string value displayed as 0
        return;
    }

    // placing new value number as a string in memory
    valueStringInMemory = getResultOfOperationAsString();
    operatorInMemory = operation;
    setStringAsValue('0');
}

// Event listeners for functions
acEl.addEventListener('click', () => {
    setStringAsValue('0');
    valueStringInMemory = null;
    operatorInMemory = null;
})

delEl.addEventListener('click', () => {

})

equalEl.addEventListener('click', () => {
    if (valueStringInMemory) {
        setStringAsValue(getResultOfOperationAsString());
        valueStringInMemory = null;
        operatorInMemory = null;
    }
})

// Event listeners for operators
additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
})

subtractEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
})

multiplyEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
})

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
})
