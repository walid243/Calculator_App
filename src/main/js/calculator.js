let memValue = null;
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

}
function clearMem(){
  memValue = null;
  result = null;
}

function isCero(value) {
  return value == "0";
}
function isDisplayClear() {
  return getDisplay().value == 0;
}
function checkDisplayableValue(value) {
  if (isSignToggleButton(value)) {
    toggleDisplayNumSign();
  } else if (hasDisplaySpace(getDisplay().value)) {
    if (isComma(value)) {
      if (isDisplayClear()) {
        value = "0,";
      } else if (includesComma(getDisplay().value)) {
        return;
      }
    } else if (isCero(value)) {
      if (isDisplayClear()) {
        return;
      }
    }
    displayAddValue(value);
  }
}
function checkNotDisplayableValue(value) {
  if (isOperator(value)) {
    saveValues(value);
  } else if (isClearButton(value)) {
    clearAll();
  } else if (isEventButton(value)) {
    even();
  }
}
function saveValues(value) {
  highlightOperator(value);
  operation = assignOperation(value);
  console.log(operation);
  saveFirstNumber();
}
function haveToClearDisplay(value) {
  if (result != null && !isOperator(value) ||
    (!isOperator(value) && operation != null && memValue != null)
  ) {
    return true
  } else {
    return false
  }
}
function takeValue(value) {
  if (haveToClearDisplay(value)) {
    console.log("se limpio");
    clearMem()
    clearDisplay();
  }
  console.log(value);
  if (isDisplayable(value)) {
    checkDisplayableValue(value);
  } else {
    checkNotDisplayableValue(value);
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
  console.log(memValue + "-> en memoria");
}
function assignOperation(value) {
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
function hasDisplaySpace(value) {
  if (value.length < 10) {
    return true;
  } else if (
    value.length < 11 &&
    (value.includes(",") || value.includes("-"))
  ) {
    return true;
  } else if (value.length < 12 && value.includes(",") && value.includes("-")) {
    return true;
  } else {
    return false;
  }
}
function isComma(value) {
  return value == ",";
}
function isFirstElement() {
  let displayValue = getDisplay().value;
  if (displayValue == 0) {
    return "0,";
  } else if (!includesComma(displayValue)) {
    return ",";
  } else {
    return null;
  }
}
function includesComma(value) {
  return value.includes(",");
}
function isDisplayable(value) {
  let digit = /\d/;
  return (
    digit.test(value) || value == "," || value == "Control" || value == "+/-"
  );
}
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
  console.log("displayableResult: " + displayableResult);
  if (hasDisplaySpace(displayableResult)) {
    clearDisplay();
    displayAddValue(displayableResult);
  } else {
    displayAddValue(errorMsg());
  }
}
function keyBoard(event) {
  if (allowedKeys().includes(event.key)) {
    event.preventDefault();

    takeValue(event.key);
  } else {
    console.log(event.key + " no permitido");
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
