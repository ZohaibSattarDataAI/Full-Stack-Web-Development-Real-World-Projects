// Calculator State
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    maxDigits: 8,
    decimalUsed: false
};

// DOM Elements
const display = document.getElementById('display');
const digitCounter = document.getElementById('digit-counter');

// Update the display
function updateDisplay() {
    // Limit to maxDigits characters
    let displayText = calculator.displayValue;
    
    if (displayText.length > calculator.maxDigits) {
        // If it's a decimal number, try to round it
        if (displayText.includes('.')) {
            const num = parseFloat(displayText);
            if (!isNaN(num)) {
                // Round to appropriate decimal places to fit maxDigits
                const decimalPlaces = calculator.maxDigits - Math.floor(num).toString().length - 1;
                if (decimalPlaces > 0) {
                    displayText = num.toFixed(decimalPlaces);
                } else {
                    // Number is too large, show in exponential form
                    displayText = num.toExponential(calculator.maxDigits - 6);
                }
            }
        } else {
            // If it's an integer and too long, show error
            if (parseFloat(displayText) > 99999999) {
                displayText = 'ERR';
            }
        }
    }
    
    display.textContent = displayText;
    
    // Update digit counter
    const currentDigits = calculator.displayValue.replace('.', '').length;
    digitCounter.textContent = `${currentDigits}/${calculator.maxDigits}`;
    digitCounter.style.color = currentDigits >= calculator.maxDigits ? '#e74c3c' : '#7f8c8d';
}

// Input a digit
function inputDigit(digit) {
    const currentDigits = calculator.displayValue.replace('.', '').length;
    
    // Check if we've reached max digits
    if (currentDigits >= calculator.maxDigits && !calculator.waitingForSecondOperand) {
        return;
    }
    
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
        calculator.decimalUsed = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
    
    updateDisplay();
}

// Input a decimal point
function inputDecimal() {
    // If we're starting a new number, start with "0."
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        calculator.decimalUsed = true;
        updateDisplay();
        return;
    }
    
    // If decimal hasn't been used in current number
    if (!calculator.decimalUsed) {
        // Check if we've reached max digits
        const currentDigits = calculator.displayValue.replace('.', '').length;
        if (currentDigits >= calculator.maxDigits) {
            return;
        }
        
        calculator.displayValue += '.';
        calculator.decimalUsed = true;
        updateDisplay();
    }
}

// Handle operators
function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);
    
    // If an operator already exists, calculate the result first
    if (calculator.operator && !calculator.waitingForSecondOperand) {
        const result = performCalculation();
        calculator.displayValue = `${parseFloat(result.toFixed(calculator.maxDigits))}`;
        updateDisplay();
    }
    
    // Store the first operand
    calculator.firstOperand = parseFloat(calculator.displayValue);
    
    // Set the operator and prepare for second operand
    calculator.operator = nextOperator;
    calculator.waitingForSecondOperand = true;
    calculator.decimalUsed = false;
}

// Perform the calculation
function performCalculation() {
    const firstValue = calculator.firstOperand;
    const secondValue = parseFloat(calculator.displayValue);
    
    if (isNaN(firstValue) || isNaN(secondValue)) {
        return 0;
    }
    
    switch (calculator.operator) {
        case 'add':
            return firstValue + secondValue;
        case 'subtract':
            return firstValue - secondValue;
        case 'multiply':
            return firstValue * secondValue;
        case 'divide':
            // Handle division by zero
            if (secondValue === 0) {
                alert('Cannot divide by zero');
                resetCalculator();
                return 0;
            }
            return firstValue / secondValue;
        default:
            return secondValue;
    }
}

// Calculate and display result
function calculateResult() {
    if (calculator.operator && !calculator.waitingForSecondOperand) {
        const result = performCalculation();
        
        // Handle result that's too large
        let resultStr = result.toString();
        if (resultStr.replace('.', '').length > calculator.maxDigits) {
            if (Math.abs(result) > 99999999) {
                resultStr = result.toExponential(calculator.maxDigits - 6);
            } else if (resultStr.includes('.')) {
                const decimalPlaces = calculator.maxDigits - Math.floor(result).toString().length - 1;
                if (decimalPlaces > 0) {
                    resultStr = result.toFixed(decimalPlaces);
                } else {
                    resultStr = Math.round(result).toString();
                }
            }
        }
        
        calculator.displayValue = resultStr;
        calculator.operator = null;
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = true;
        calculator.decimalUsed = resultStr.includes('.');
        
        updateDisplay();
    }
}

// Reset the calculator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    calculator.decimalUsed = false;
    updateDisplay();
}

// Delete the last character
function deleteLast() {
    if (calculator.waitingForSecondOperand) {
        return;
    }
    
    if (calculator.displayValue.length === 1) {
        calculator.displayValue = '0';
        calculator.decimalUsed = false;
    } else {
        // Check if we're deleting a decimal point
        if (calculator.displayValue.slice(-1) === '.') {
            calculator.decimalUsed = false;
        }
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    }
    
    updateDisplay();
}

// Handle button clicks
function handleButtonClick(event) {
    const target = event.target;
    
    // Check if clicked element is a button or its child
    const button = target.closest('.btn');
    if (!button) return;
    
    // Add visual feedback
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 150);
    
    // Handle number buttons
    if (button.classList.contains('number')) {
        const number = button.getAttribute('data-number');
        if (number) {
            inputDigit(number);
        } else if (button.getAttribute('data-action') === 'decimal') {
            inputDecimal();
        }
        return;
    }
    
    // Handle operator buttons
    if (button.classList.contains('operator')) {
        const action = button.getAttribute('data-action');
        
        switch (action) {
            case 'clear':
                resetCalculator();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperator(action);
                break;
        }
        return;
    }
    
    // Handle equals button
    if (button.classList.contains('equals')) {
        calculateResult();
    }
}

// Keyboard support
function handleKeyPress(event) {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (/[\d+\-*/.=]|Enter|Backspace|Delete|Escape/.test(key)) {
        event.preventDefault();
    }
    
    if (key >= '0' && key <= '9') {
        inputDigit(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        handleOperator('add');
    } else if (key === '-') {
        handleOperator('subtract');
    } else if (key === '*') {
        handleOperator('multiply');
    } else if (key === '/') {
        handleOperator('divide');
    } else if (key === '=' || key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape' || key === 'Delete') {
        resetCalculator();
    } else if (key === 'Backspace') {
        deleteLast();
    }
}

// Initialize calculator
function initCalculator() {
    // Add event listeners to buttons
    document.querySelector('.buttons-grid').addEventListener('click', handleButtonClick);
    
    // Add keyboard support
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial display update
    updateDisplay();
}

// Start the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalculator);