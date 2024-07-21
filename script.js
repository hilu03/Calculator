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
  return result;
}

function turnOffClick() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach(operator => {
    operator.style.opacity = 1;
  });
}

let firstNumber = 0, secondNumber = 0;
let start = true, error = false, dotExist = false;
let opt;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const display = document.querySelector(".display");
    if (start && dotExist) {
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
    display.textContent = Number(display.textContent + button.textContent);
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
      firstNumber = result != "@-@"? result: 0;
      secondNumber = 0;
    }
    else {
      firstNumber = Number(display.textContent);
    }
    opt = operator.dataset.opt;
    turnOffClick();
    operator.style.opacity = 0.7;
    dotExist = false;
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
  dotExist = false; 
  turnOffClick();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  const display = document.querySelector(".display");
  const current = display.textContent;
  if (current.length == 1) {
    display.textContent = "0";
    start = true;
  }
  else {
    display.textContent = current.slice(0, current.length - 1);
  }
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
    dotExist = false; 
  }
});

const percent = document.querySelector(".percent");
percent.addEventListener("click", () => {
  if (!start) {
    const display = document.querySelector(".display");
    let n = (Number(display.textContent) / 100).toString();
    if (n.includes(".") && n.split(".")[1].length > 8) {
      n = Number(n).toFixed(7);
    }
    display.textContent = n;
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  if (!dotExist) {
    const display = document.querySelector(".display");
    if (opt) {
      display.textContent = "0";
      secondNumber = 1;
    }
    display.textContent += ".";
    dotExist = true;
    start = false;
  }
});