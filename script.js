const calculator = document.querySelector('.calculator__inner');
const display = document.querySelector('.calculator__displays__current');
const buttons = calculator.querySelector('.calculator__buttons');
const ac = calculator.querySelector('.calculator__button--clear');
console.log(display);

buttons.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (display.textContent != '' || display.textContent != '-') {
      ac.textContent = 'CE';
    }

    if (
      action === 'add' ||
      action === 'minus' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed');
    }
    if (action === 'clear') {
      if (
        displayedNum.slice(0, display.textContent.length - 1) == '' ||
        displayedNum.slice(0, display.textContent.length - 1) == '-' ||
        displayedNum.slice(0, display.textContent.length - 1) == 0
      ) {
        display.classList.remove('para-unactive');
        display.textContent = '0';
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
    }
    if (action === 'decimal') {
      if (
        displayedNum.slice(
          display.textContent.length - 1,
          display.textContent.length
        ) == '.'
      ) {
      } else {
        display.textContent = displayedNum + '.';
      }
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

    if (!action) {
      if (displayedNum === '0') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove('is-depressed')
    );
  }
});
