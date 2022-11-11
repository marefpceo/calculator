const screenBody = document.querySelector('#screen-body');
const screenHead = document.querySelector('#screen-head');
const buttons = document.querySelectorAll('button');

let displayValue = [];
let total = 0;
let operator = '';
let isCalculating = true;
let isDecimal = false;


// Provides keyboard functionality
window.addEventListener('keydown', (e) => {
    preCalculationCheck();
    if(e.key >= 0 || e.key <= 9){
        screenBody.textContent += e.key;
    }

    if(e.key === '+' || e.key === '-' || e.key === '*' ||
        e.key === '/'){
            operatorProcess(e.key);
    }

    if(e.key === 'Backspace'){
        deleteNumber();
    }

    if(e.key === 'Enter'){
        calculateEqual();
    }
    console.log(e);
});

// Deletes the last number inputted
function deleteNumber(){
    let currentVal = screenBody.innerHTML.valueOf();
    let str = currentVal.slice(0, -1);
        screenBody.textContent = str;
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {

        preCalculationCheck();

        for(let i = 0; i <= 9; i++){
            if(button.id === ('btn-'+[i])){
                screenBody.textContent += button.innerText;
            }
            console.log(button.id);
        }

        switch (button.id) {       
            case 'divide':
            case 'btn-x':        
            case 'minus':
            case 'add':    
                operatorProcess(button.innerText);
                break;   

            case 'clear':
                clear();
                break;

            case 'back':
                deleteNumber();
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
                }            
                break;    

            case 'percent':
                isDecimal = false;
                if(operator === '+' || operator === '-' || operator === '\u00f7'){
                    processValue();
                    operator = '%';
                    displayValue.length = 0;
                    processValue();
                }else {
                    operator = '%';
                    processValue();
                }
                break;

            case 'equal':
                calculateEqual();
                break;
        }
    });
});

// Sets the operator
function setOperator(keyValue){
    if(keyValue === '*') {
        operator = 'x';
    }else if(keyValue === '/'){
        operator = '\u00f7'
    }else{
        operator = keyValue;
    }
}

// 
function operatorProcess(inputValue){
    isDecimal = false;
    if (operator === '' || operator === '%') {
        setOperator(inputValue);
        processValue();
    }else {
        processValue();
        setOperator(inputValue);
    }
}

// Logic for equal button
function calculateEqual(){
    if(displayValue.length < 1){
        return;
    }else {
        processValue();
        displayValue.length = 0;
        isDecimal = false;
    }
}

// Checks and sets the current state of the calculation and clears any errors 
function preCalculationCheck(){
    if(isCalculating === false) {
        screenBody.textContent = '';
        isCalculating = true;
    }
    if(screenBody.innerHTML.toString() === 'really???'){
        clear();            
    }
}

// Stores or calculate the value based on the conditions
function processValue() {
    if ((displayValue.length === 0) && (operator !== '%')) {
        storeDisplayValue();
    }else {
        storeDisplayValue();
        operate(operator, displayValue);
        displayTotal();
        displayValue.length = 0;
        displayValue.push(total);
        isCalculating = false;
    }
}

// Stores the input value from the user into an array and displays value in the header
function storeDisplayValue() {
    displayValue.push(screenBody.innerHTML.valueOf('div'));
    displayHeader();
    screenBody.textContent = '';
}

// Displays the total on the screen and limits the number of characters
function displayTotal(){
    if(isNaN(total)){
        clear();
        screenBody.textContent = 'really???';
    }else {
        total = +total.toFixed(10);
        screenBody.textContent = total;
    }
}

// Displays the current operation in the header area
function displayHeader() {
    screenHead.textContent = '';
    if (displayValue.length === 1){
        screenHead.textContent = `${displayValue[0]} ${operator}`;
    }else if(displayValue.length === 2) {
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

// Calls the operation based on operator input
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