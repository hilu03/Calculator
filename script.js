function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b != 0) {
    return a / b;
  }
  error = true;
  return "Oops!";
}

function operate(first, second, opt) {
  switch(opt) {
    case "+":
      return add(first, second);
    case "-":
      return subtract(first, second);
    case "*":
      return multiply(first, second);
    case "/":
      return divide(first, second);
  }
}

function turnOffClick() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach(operator => {
    operator.style.opacity = 1;
  });
}

let firstNumber = 0;
let secondNumber = 0;
let start = true, error = false;
let opt;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.querySelector(".display");
    if (start) {
      if (button.textContent != "0") {
        display.textContent = "";
        start = false;  
      }
      else {
        return;
      }
    }
    else if (error) {
      display.textContent = "";
      error = false;
    }
    else if ((opt && !secondNumber)) {
      display.textContent = "";
      secondNumber = 1;
    }
    display.textContent += button.textContent;
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
  operator.addEventListener("click", () => {
    const display = document.querySelector(".display");
    if (error) {
      display.textContent =  "0";
      firstNumber = 0;
      error = false;
    }
    else if (opt) {
      secondNumber = Number(display.textContent);
      const result = operate(firstNumber, secondNumber, opt);
      display.textContent =  result;
      firstNumber = result != "Oops!"? result: 0;
      secondNumber = 0;
    }
    else {
      firstNumber = Number(display.textContent);
    }
    opt = operator.textContent;
    turnOffClick();
    operator.style.opacity = 0.7;
  });
});

const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", () => {
  const display = document.querySelector(".display");
  display.textContent = "0";
  opt = "";
  start = true;
  firstNumber = 0;
  secondNumber = 0;
  turnOffClick();
});

const result = document.querySelector(".equal");
result.addEventListener("click", () => {
  if (opt) {
    const display = document.querySelector(".display");
    secondNumber = Number(display.textContent);
    display.textContent = operate(firstNumber, secondNumber, opt);
    opt = "";
    secondNumber = 0;
    firstNumber = 0;
    turnOffClick();  
  }
});