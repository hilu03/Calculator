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
  return a / b;
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
let start = true;
let opt;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.querySelector(".display");
    if (start) {
      display.textContent = "";
      start = false;
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
    if (opt) {
      secondNumber = Number(display.textContent);
      const result = operate(firstNumber, secondNumber, opt);
      display.textContent =  result;
      firstNumber = result;
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

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
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