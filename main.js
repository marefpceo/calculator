const screenBody = document.querySelector('#screen-body');
const screenHead = document.querySelector('#screen-head');
const buttons = document.querySelectorAll('button');


let displayValue = [];
let total = 0;
let operator = '';
let isCalculating = true;
let isDecimal = false;



buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(isCalculating === false) {
            screenBody.textContent = '';
            isCalculating = true;
        }

        if(screenBody.innerHTML.toString() === 'really???'){
            clear();            
        }

        switch (button.id) {
            case 'clear':
                clear();
                break;

            case 'back':
                let currentVal = screenBody.innerHTML.valueOf();
                str = currentVal.slice(0, -1);
                screenBody.textContent = str;
                break;
                
            case 'zero':
                screenBody.textContent += '0';
                break;

            case 'btn-1':
                screenBody.textContent += '1';
                break;
            
            case 'btn-2':
                screenBody.textContent += '2';
                break;

            case 'btn-3':
                screenBody.textContent += '3';
                break;    
            
            case 'btn-4':
                screenBody.textContent += '4';
                break;
                
            case 'btn-5':
                screenBody.textContent += '5';
                break; 

            case 'btn-6':
                screenBody.textContent += '6';
                break;       
                
            case 'btn-7':
                screenBody.textContent += '7';
                break;
                
            case 'btn-8':
                screenBody.textContent += '8';
                break;

            case 'btn-9':
                screenBody.textContent += '9';
                break;    

            case 'pos-neg':
                let sign = screenBody.innerHTML.valueOf();
                if (sign.charAt(0) !== '-'){
                    screenBody.textContent = ('-' + sign) ;
                }else {
                    screenBody.textContent = sign.substring(1);
                }
                break;
                
            case 'decimal':
                if(isDecimal === false){
                    screenBody.textContent += '.';
                    isDecimal = true;
                }else {
                    return;
                }                
                break;    

            case 'percent':
                isDecimal = false;
                if(operator === '+' || operator === '-' || operator === '\u00f7'){
                    processValue();
                    operator = '%';
                    clearDisplayValue();
                    processValue();
                }else {
                    operator = '%';
                    processValue();
                }
                break;

            case 'divide':
                isDecimal = false;
                if (operator === '' || operator === '%') {
                    operator = '\u00f7';
                    processValue();
                }else {
                    processValue();
                    operator = '\u00f7';
                }
                break;

            case 'btn-x':
                isDecimal = false;
                if (operator === '' || operator === '%') {
                    operator = 'x';
                    processValue();
                }else {
                    processValue();
                    operator = 'x';
                }
                break; 

            case 'minus':
                isDecimal = false;
                if (operator === '' || operator === '%') {
                    operator = '-';
                    processValue();
                }else {
                    processValue();
                    operator = '-';
                }
                break;    

            case 'add':
                isDecimal = false;
                if (operator === '' || operator === '%') {
                    operator = '+';
                    processValue();
                }else {
                    processValue();
                    operator = '+';
                }
                break;

            case 'equal':
                if(displayValue.length < 1){
                    break;
                }else {
                    processValue();
                    clearDisplayValue();
                    isDecimal = false;
                }
                break;
        }
    });
});


// Determines if current value should be stored or calculated based on the 
// lenght of displayValue array
function processValue() {
    if (displayValue.length === 0 && operator !== '%') {
        storeDisplayValue();
    }else {
        storeDisplayValue();
        operate(operator, displayValue);
        displayTotal();
        clearDisplayValue();
        displayValue.push(total);
        isCalculating = false;
    }
}


// Stores the input value from the user into an array and calls the displayHeader() function
function storeDisplayValue() {
    displayValue.push(screenBody.innerHTML.valueOf('div'));
    displayHeader();
    screenBody.textContent = '';
}


// Displays the total on the screen
function displayTotal(){
    if(isNaN(total)){
        total = '';
        screenBody.textContent = 'really???';
    }else {
        total = +total.toFixed(10);
        screenBody.textContent = total;
    }
}


// Clears the array storing the values
function clearDisplayValue(){
    displayValue.length = 0;
}


// Displays the current operation in the header area
function displayHeader() {
    if (displayValue.length === 1){
        screenHead.textContent = `${displayValue[0]} ${operator}`;
    }else if (displayValue.length === 2) {
        screenHead.textContent = `${displayValue[0]} ${operator} ${displayValue[1]}`;
    }else {
        screenHead.textContent = '';
    }
}


// Clears screen and resets calculator
function clear(){
    screenBody.textContent = '';
    screenHead.textContent = '';
    operator = '';
    total = 0;
    displayValue.length = 0;
}


// Operate function that calls which function to use for performing
// based on the user input
function operate(operatorInput, operandInput) {
    
    switch (operatorInput) {
        case "+":
            add(operandInput);
            break;
    
        case "-":
            subtract(operandInput);
            break;

        case "x":
            multiply(operandInput);
            break;

        case "\u00f7":
            divide(operandInput);
            break;
            
        case "%":
            percent(operandInput);
            break;
    }
    return total;
}



/******************** Math functions ********************/
/********************************************************/
// Addition function
function add(operand) {
    total = operand.reduce((a, b) => ((Number(a) * 10) + (Number(b) * 10)) / 10);
}

// Subtraction function
function subtract(operand) {
    total = operand.reduce((a, b) => ((Number(a) * 10) - (Number(b) * 10)) / 10);
}

// Multiply function
function multiply(operand) {
    total = operand.reduce((a, b) => ((Number(a) * 10) * (Number(b) * 10)) / 100);
}

// Division function
function divide(operand) {
    if (operand[1] === '0'){
        screenBody.textContent = 'really???';
        total = '';
    }else if(operand[1] === ''){
        return;
    }
    else {
        total = operand.reduce((a, b) => Number(a) / Number(b));
    }
}

// Percentage function 
function percent(operand) {
    total = Number(operand) * 0.01;
}
/********************************************************/
/********************************************************/