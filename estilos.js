
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear = () => {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete = () => {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber = (number) => {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = `${this.currentOperand}${number}`;
    }

    chooseOperation = (operation) => {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute = () => {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        // Usando funciones flecha y template strings
        const operations = {
            '+': (a, b) => `${a + b}`,
            '-': (a, b) => `${a - b}`,
            '×': (a, b) => `${a * b}`,
            '÷': (a, b) => b !== 0 ? `${a / b}` : 'Error'
        };

        computation = operations[this.operation](prev, current);
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay = () => {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.hasAttribute('data-number')) {
            calculator.appendNumber(button.innerText);
        } else if (button.hasAttribute('data-action')) {
            switch (button.getAttribute('data-action')) {
                case 'add':
                    calculator.chooseOperation('+');
                    break;
                case 'subtract':
                    calculator.chooseOperation('-');
                    break;
                case 'multiply':
                    calculator.chooseOperation('×');
                    break;
                case 'divide':
                    calculator.chooseOperation('÷');
                    break;
                case 'clear':
                    calculator.clear();
                    break;
                case 'delete':
                    calculator.delete();
                    break;
                case 'calculate':
                    calculator.compute();
                    break;
            }
        }
        calculator.updateDisplay();
    });
});