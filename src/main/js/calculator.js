let memValue = "";
let num1 = null;
let num2 = null;
let result;
let operation;
addEvents();
function addEvents() {
  buttonsEvent();
  keyBoardEvent();
}

function buttonsEvent() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function (Event) {
      takeValue(Event.currentTarget.textContent);
    });
  }
}

function keyBoardEvent() {
  document.addEventListener("keydown", keyBoard);
}

function getDisplay() {
  return document.getElementById("display");
}

function clearAll() {
  getDisplay().value = null;
  memValue = null;
  num1 = null;
  num2 = null;
  operation = null;
  result = null;
  unHighlightOperator();
}
function clearDisplay() {
  getDisplay().value = null;
  memValue = null;
  result = null;
}
function takeValue(value) {
  console.log(value);
  if (value != 0 || (value == 0 && getDisplay().value != 0)) {
    if (
      (result == null && (value == "3" || value == ",") || (!isOperator(value) && operation != null && memValue == num1)
      )
    ) {
      console.log("se limpio");
      clearDisplay();
    }
    if (isDisplayable(value) && canDisplay(getDisplay().value)) {
      console.log("displayable");
      if (isComma(value)) {
        console.log("is comma");
        value = isFirstComma(value);
      } else if (isSignToggleButton(value)) {
        console.log(value + " -> +/-");
        toggleDisplayNumSign();
      }
      if (value != "Control" && value != null) {
        displayAddValue(value);
      }
    } else {
      if (isOperator(value)) {
        highlightOperator(value);
        operation = saveOperator(value);
        console.log(operation);
        saveFirstNumber();
      } else if (isClearButton(value)) {
        console.log(value + " -> Clear");
        clearAll();
      } else if (isEventButton(value)) {
        console.log(value + " -> =");
        even();
      }
    }
  }
}
function isOperator(value) {
  return ["+", "-", "/", "*", "x"].includes(value);
}
function toggleComma(value) {
  if (value.includes(",")) {
    value = value.replace(",", ".");
  } else if (value.includes(".")) {
    value = value.replace(".", ",");
  }
  return value;
}
function saveInMemory() {
  let value = getDisplay().value;
  memValue = toggleComma(value);
  console.log(memValue + "-> en saveInMem");
}
function saveOperator(value) {
  switch (value) {
    case "+":
      return addition;
    case "-":
      return substraction;
    case "/":
      return divition;
    case "x":
      return multiplication;
    case "*":
      return multiplication;
  }
}
function saveFirstNumber() {
  saveInMemory();

  num1 = parseFloat(memValue);
}
function saveSecondNumber() {
  saveInMemory();
  num2 = parseFloat(memValue);
}

function isClearButton(value) {
  return ["Escape", "C"].includes(value);
}
function isEventButton(value) {
  return ["=", "Enter"].includes(value);
}
function isSignToggleButton(value) {
  return ["+/-", "Control"].includes(value);
}
function canDisplay(value) {
  if (value.length < 10) {
    return true;
  } else if (
    value.length < 11 &&
    (value.includes(",") || value.includes("-"))
  ) {
    return true;
  } else if (value.length < 12 && value.includes(",") && value.includes("-")) {
    console.log(value);
    return true;
  } else {
    return false;
  }
}
function isComma(value) {
  return value == ",";
}
function isFirstComma() {
  let value = getDisplay().value;
  if (value == 0) {
    return "0,";
  } else if (!includesComma(value)) {
    return ",";
  } else {
    return null;
  }
}
function includesComma(value) {
  return value.includes(",");
}
function isDisplayable(value) {
  let digit = /\d*,*/;
  return (
    digit.test(value) || value == "," || value == "Control" || value == "+/-"
  );
}
// function dotToComma(value) {
//   if (value == ".") {
//     return ",";
//   }
// }
function displayAddValue(value) {
  let display = getDisplay();

  display.value += value;
}
function toggleDisplayNumSign() {
  let display = getDisplay();
  if (display.value != 0 && display.value != "0,") {
    if (display.value.includes("-")) {
      display.value = display.value.slice(1);
    } else {
      display.value = "-" + display.value;
    }
  }
}
function calculate() {
  result = operation(num1, num2);
}
function addition(num1, num2) {
  return num1 + num2;
}
function substraction(num1, num2) {
  return num1 - num2;
}
function multiplication(num1, num2) {
  return num1 * num2;
}
function divition(num1, num2) {
  return num1 / num2;
}

function highlightOperator(value) {
  unHighlightOperator();
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    if (
      operators[i].textContent == value ||
      (value == "*" && operators[i].textContent == "x")
    ) {
      operators[i].classList.add("highlightedOperator");
      break;
    }
  }
}
function unHighlightOperator() {
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove("highlightedOperator");
  }
}
function even() {
  saveSecondNumber();
  calculate();
  unHighlightOperator();
  console.log("result: " + result);
  let displayableResult = toggleComma(result.toString());
  console.log("result: " + displayableResult);
  if (canDisplay(displayableResult)) {
    clearDisplay();
    displayAddValue(displayableResult);
  } else {
    displayAddValue(errorMsg());
  }
}
function keyBoard(event) {
  event.preventDefault();
  if (allowedKeys().includes(event.key)) {
    console.log(event.key + " yes");
    takeValue(event.key);
  } else {
    console.log(event.key + " no");
  }
}
function allowedKeys() {
  return Array(
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ",",
    "/",
    "*",
    "-",
    "+",
    "Enter",
    "Escape",
    "Control"
  );
}
function errorMsg() {
  return "ERROR";
}
