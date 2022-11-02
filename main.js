let total = 0;
let operator = "";
let input1 = 10;
let input2 = 2;



// Operate function that calls the correct calculation function
// based on the user input
function operate(operator) {
    let operand1 = input1;
    let operand2 = input2;

    switch (operator) {
        case "+":
            add(operand1, operand2);
            break;
    
        case "-":
            subtract(operand1, operand2);
            break;

        case "*":
            multiply(operand1, operand2);
            break;

        case "/":
            divide(operand1, operand2);
            break;
            
        case "%":
            percent(operand1);
            break;
    }
    return total;
}

console.log("additon function: " + operate("+"));
console.log("subtraction function: " + operate("-"));
console.log("multiply function: " + operate("*"));
console.log("divide function: " + operate("/"));
console.log("percentage function: " + operate("%"));


/******************** Math functions ********************/
/********************************************************/
// Addition function
function add(operand1, operand2) {
    total = operand1 + operand2;
}

// Subtraction function
function subtract(operand1, operand2) {
    total = operand1 - operand2;
}

// Multiply function
function multiply(operand1, operand2) {
    total = operand1 * operand2;
}

// Division function
function divide(operand1, operand2) {
    total = operand1 / operand2;
}

// Percentage function 
function percent(operand1) {
    total = operand1 * 0.01;
}
/********************************************************/
/********************************************************/