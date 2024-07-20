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

let firstNumber, opt, secondNumber;
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.querySelector(".display");
    display.textContent += button.textContent;
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
  operator.addEventListener("click", () => {
    const display = document.querySelector(".display");
    firstNumber = Number(display.textContent);
    opt = operator.textContent;
    display.textContent += " " + operator.textContent + " ";
  });
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  const display = document.querySelector(".display");
  display.textContent = "";
});

const result = document.querySelector(".equal");
result.addEventListener("click", () => {
  const display = document.querySelector(".display");
  secondNumber = Number(display.textContent.split(opt)[1]);
  display.textContent = operate(firstNumber, secondNumber, opt);
  opt = "";
});