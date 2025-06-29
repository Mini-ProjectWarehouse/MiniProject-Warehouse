numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}

let finalResult = 0;
let operator = '';
let activeOperator = false;
let errorState = false;

const updateDisplay = (text) => {
    $('.result').text(text);
};

const resetCalculator = () => {
    finalResult = 0;
    operator = '';
    activeOperator = false;
    errorState = false;
    updateDisplay('0');
};

$('#ac').click(() => {
    resetCalculator();
});

$('#sign').click(() => {
    if (errorState) return;
    let display = $('.result').text();
    if (display === '0') return;
    if (display.startsWith('-')) {
        updateDisplay(display.substring(1));
    } else {
        updateDisplay('-' + display);
    }
});

$('#percentage').click(() => {
    if (errorState) return;
    let display = $('.result').text();
    let num = parseFloat(display);
    num = num / 100;
    updateDisplay(num.toString());
});

$('.operator').click(e => {
    if (errorState) return;
    let id = e.target.id;
    if (id === 'equal') {
        calculate();
        operator = '';
        activeOperator = false;
    } else {
        if (!activeOperator) {
            calculate();
        }
        operator = id;
        activeOperator = true;
    }
});

$('.number').click(e => {
    if (errorState) return;
    let id = e.target.id;
    let num = numbers[id].toString();

    if (activeOperator) {
        updateDisplay(num);
        activeOperator = false;
    } else {
        let display = $('.result').text();
        if (display === '0') {
            updateDisplay(num);
        } else {
            updateDisplay(display + num);
        }
    }
});

$('#point').click(() => {
    if (errorState) return;
    let display = $('.result').text();
    if (!display.includes('.')) {
        updateDisplay(display + '.');
    }
});

const calculate = () => {
    let displayedNumber = parseFloat($('.result').text());
    switch (operator) {
        case 'addition':
            finalResult += displayedNumber;
            break;
        case 'subtraction':
            finalResult -= displayedNumber;
            break;
        case 'multiplication':
            finalResult *= displayedNumber;
            break;
        case 'division':
            if (displayedNumber === 0) {
                updateDisplay('Error');
                errorState = true;
                return;
            }
            finalResult /= displayedNumber;
            break;
        default:
            finalResult = displayedNumber;
            break;
    }
    updateDisplay(finalResult.toString());
};

const emptyResult = () => {
    return $('.result').text() === '';
}

const hasChar = char => {
    result = $('.result').text();
    return result.indexOf(char) !== -1;
}

const firstChar = () => {
    return $('.result').text().charAt(0);
}

const secoundChar = () => {
    return $('.result').text().charAt(1);
}

const pointIncluded = () => {
    result = $('.result').text();
    return result.includes('.');
}

const append = txt => {
    result = $('.result').text();
    $('.result').text(result + txt)
}

const prepend = sign => {
    result = $('.result').text();
    $('.result').text(sign + result);
}
