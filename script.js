const calculator = document.querySelector('.calculator__inner');
const upDisplay = document.querySelector('.calculator__displays__after');
const display = document.querySelector('.calculator__displays__current');
const buttons = calculator.querySelector('.calculator__buttons');
const ac = calculator.querySelector('.calculator__button--clear');
console.log(display);

buttons.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayEquation = upDisplay.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = display.dataset.previousKeyType;

    //turn the clear/delete button to CE if there's a value
    if (display.textContent != '' || display.textContent != '-') {
      ac.textContent = 'CE';
    }

    if (
      action === 'add' ||
      action === 'minus' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      // After the operation, save the first value
      key.classList.add('is-depressed');
      display.dataset.firstValue = displayedNum;
      display.dataset.operator = action;
      display.dataset.previousKeyType = 'operator';
      if (display.dataset.operator === 'operator') {
        display.textContent = calculate(firstValue, operator, displayedNum);
        console.log(display.dataset.firstValue);
        console.log(display.dataset.operator);
      }
    }

    if (action === 'clear') {
      if (
        displayedNum.slice(0, display.textContent.length - 1) == '' ||
        displayedNum.slice(0, display.textContent.length - 1) == '-' ||
        displayedNum.slice(0, display.textContent.length - 1) == 0 ||
        displayedNum.match('NaN')
      ) {
        //remove the ghost right parathenses
        display.classList.remove('para-unactive');
        // reset the display
        display.textContent = '0';
        upDisplay.textContent = '0';
        display.dataset.firstValue = '';
        display.dataset.secondValue = '';
        ac.textContent = 'AC';
      } else if (
        displayedNum.slice(
          display.textContent.length - 1,
          display.textContent.length
        ) == ')'
      ) {
        display.classList.add('para-unactive');
        display.textContent = displayedNum.slice(
          0,
          display.textContent.length - 1
        );
      } else {
        display.textContent = displayedNum.slice(
          0,
          display.textContent.length - 1
        );
      }
      if (displayedNum.slice(0, display.textContent.length - 1) == ')') {
        display.classList.add('para-unactive');
      }
      display.dataset.previousKeyType = 'clear';
    }

    if (action === 'decimal') {
      if (display.dataset.previousKeyType == 'operator') {
        display.textContent = '0.';
      } else if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      }

      display.dataset.previousKeyType = 'decimal';
    }

    if (action === 'absolute') {
      if (display.textContent == '0') {
        ac.textContent = 'AC';
      } else {
        if (display.textContent.includes('-')) {
          display.textContent = displayedNum.slice(
            1,
            display.textContent.length
          );
        } else {
          display.textContent = '-' + displayedNum;
        }
      }
    }

    if (action === 'percent') {
      if (displayedNum === '0') {
        display.textContent = '0';
      } else {
        display.textContent = (parseFloat(displayedNum) / 100).toFixed(2);
      }
    }

    if (action === 'lpara') {
      if (display.textContent == '0') {
        display.textContent = '(';
        display.classList.add('para-unactive');
      } else {
        display.textContent = '(' + displayedNum;
        display.classList.add('para-unactive');
      }
    }
    if (action === 'rpara') {
      if (display.textContent == '0') {
        display.classList.remove('para-unactive');
      } else {
        display.textContent = displayedNum + ')';
        display.classList.remove('para-unactive');
      }
    }

    if (action === 'equal') {
      if (display.dataset.previousKeyType === 'equal') {
      } else {
        const firstValue = display.dataset.firstValue;
        const operator = display.dataset.operator;
        const secondValue = displayedNum;
        if (firstValue) {
          display.textContent = calculate(firstValue, operator, secondValue);
        }

        // display.textContent = calculate(firstValue, operator, secondValue);
        upDisplay.textContent = equation(firstValue, operator, secondValue);
      }

      display.dataset.previousKeyType = 'equal';
    }

    if (!action) {
      // if previous key was operator, enter the second Value. else display the whole number
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      display.dataset.previousKeyType = 'number';
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove('is-depressed')
    );
  }
});

function calculate(x, op, y) {
  try {
    if (op === 'add') {
      return parseFloat(x) + parseFloat(y);
    } else if (op === 'minus') {
      return parseFloat(x) - parseFloat(y);
    } else if (op === 'multiply') {
      return parseFloat(x) * parseFloat(y);
    } else if (op === 'divide') {
      return parseFloat(x) / parseFloat(y);
    }
  } catch (error) {
    return 'Error: Invalid input';
  }
}

function equation(x, op, y) {
  let string = '';
  if (op === 'add') {
    string = `${x} ` + '+' + ` ${y}`;
    return string;
  } else if (op === 'minus') {
    string = `${x} ` + '-' + ` ${y}`;
    return string;
  } else if (op === 'multiply') {
    string = `${x} ` + '×' + ` ${y}`;
    return string;
  } else if (op === 'divide') {
    string = `${x} ` + '÷' + ` ${y}`;
    return string;
  } else {
    string = '0';
    return string;
  }
}
