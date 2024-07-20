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
let opt;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.querySelector(".display");
    if (opt && !secondNumber) {
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
    firstNumber = Number(display.textContent);
    opt = operator.textContent;
    turnOffClick();
    operator.style.opacity = 0.7;
  });
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  const display = document.querySelector(".display");
  display.textContent = "";
  opt = "";
  firstNumber = 0;
  secondNumber = 0;
  turnOffClick();
});

const result = document.querySelector(".equal");
result.addEventListener("click", () => {
  const display = document.querySelector(".display");
  secondNumber = Number(display.textContent);
  display.textContent = operate(firstNumber, secondNumber, opt);
  opt = "";
  turnOffClick();
});