let firstNumber = 0, secondNumber = 0;
let start = true, error = false, dotExist = false;
let opt;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    numberEvent(button.textContent);
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
  operator.addEventListener("click", () => {
    operatorEvent(operator);
  });
});

const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", () => {
  allClearEvent();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  deleteEvent();
});

const result = document.querySelector(".equal");
result.addEventListener("click", () => {
  equalEvent();
});

const percent = document.querySelector(".percent");
percent.addEventListener("click", () => {
  percentEvent();
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  decimalEvent();
});

const negative = document.querySelector(".negative");
negative.addEventListener("click", () => {
  negativeEvent();
});

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  switch(key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numberEvent(key);
      break;
    case "+":
      const plus = document.querySelector(`.operator[data-key="+"]`);
      operatorEvent(plus);
      break;
    case "-":
      const subtract = document.querySelector(`.operator[data-key="-"]`);
      operatorEvent(subtract);
      break;
    case "*":
      const multiply = document.querySelector(`.operator[data-key="*"]`);
      operatorEvent(multiply);
      break;
    case "/":
      const divide = document.querySelector(`.operator[data-key="/"]`);
      operatorEvent(divide);
      break;
    case "%":
      percentEvent();
      break;
    case "n":
      negativeEvent();
      break;
    case ".":
      decimalEvent();
      break;
    case "=":
    case "enter":
      equalEvent();
      break;
    case "c":
      allClearEvent();
      break;
    case "backspace":
      deleteEvent();
      break;
  }
});


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
  return "@-@";
}

function operate(first, second, opt) {
  let result;
  switch(opt) {
    case "+":
      result = add(first, second);
      break;
    case "-":
      result = subtract(first, second);
      break;
    case "*":
      result = multiply(first, second);
      break;
    case "/":
      result = divide(first, second);
  }
  if (!result) {
    start = true;
  }
  else if (result.toString().includes(".")) {
    dotExist = true;
  }
  return displayNumber(result);
}

function turnOffClick() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach(operator => {
    operator.style.opacity = 1;
  });
}

function displayNumber(number) {
  let str = Number(number).toString();
  if (str.split(".")[0].length > 6) {
    number = Number(number).toExponential(6);
    if (number.toString().includes(".")) {
      dotExist = true;
    }
  }
  else if (str.includes(".") && str.split(".")[1].length > 8) {
    number = Number(number).toFixed(8);
  }
  return number;
}

function numberEvent(n) {
  const display = document.querySelector(".display");
  if (start && dotExist) {
    if (button.textContent != "0") {
      display.textContent = "";
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
  start = false;
  const current = display.textContent;
  let number;
  if (current.includes("e")) {
    number = Number(Number(display.textContent).toString() + n);
  }
  else {
    number = Number(display.textContent + n);
  }
  display.textContent = displayNumber(number);
}

function operatorEvent(operator) {
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
    firstNumber = result != "@-@"? result: 0;
    secondNumber = 0;
  }
  else {
    firstNumber = Number(display.textContent);
  }
  opt = operator.dataset.key;
  turnOffClick();
  operator.style.opacity = 0.7;
  dotExist = false;
}

function allClearEvent() {
  const display = document.querySelector(".display");
  display.textContent = "0";
  opt = "";
  start = true;
  firstNumber = 0;
  secondNumber = 0;
  dotExist = false; 
  turnOffClick();
}

function deleteEvent() {
  const display = document.querySelector(".display");
  const current = display.textContent;
  if ((current.length == 1) || (current.length == 2 && current.includes("-"))) {
    display.textContent = "0";
    start = true;
  }
  else {
    if (current[current.length - 1] == ".") {
      dotExist = false;
    }
    display.textContent = current.slice(0, current.length - 1);
  }
}

function equalEvent() {
  if (opt) {
    const display = document.querySelector(".display");
    secondNumber = Number(display.textContent);
    display.textContent = displayNumber(operate(firstNumber, secondNumber, opt));
    opt = "";
    secondNumber = 0;
    firstNumber = 0;
    turnOffClick();
  }
}

function percentEvent() {
  if (!start) {
    const display = document.querySelector(".display");
    let n = (Number(display.textContent) / 100).toString();
    display.textContent = displayNumber(n);
  }
}

function decimalEvent() {
  if (!dotExist) {
    const display = document.querySelector(".display");
    if (opt && !secondNumber) {
      display.textContent = "0";
      secondNumber = 1;
    }
    display.textContent += ".";
    dotExist = true;
    start = false;
  }
}

function negativeEvent() {
  const display = document.querySelector(".display");
  let current = Number(display.textContent);
  if (current != 0) {
    current /= -1;
  }
  else {
    dotExist = false;
  }
  display.textContent = displayNumber(current);
}