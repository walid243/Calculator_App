var memValue = null;
var num1 = null;
var num2 = null;
var result;
var operation;
var displayWasCleared = false;
var areDisplayableButtonsDisabled = false;
var areOperatorButtonsDisabled = false;
var haveToDisableSignToggleButton = true;
var haveToDisableCommaButton = false;
var haveToDisableCeroButton = true;
var haveToDisableDisplayableButtons = false;
var haveToRestoreAllButtons = false;
var haveToRestoreDisplayableButtons = false;
addEvents();
updateButtonStatus();
function addEvents() {
  buttonsEvent();
  keyBoardEvent();
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
function addition(num1, num2) {
  return num1 + num2;
}
function buttonsEvent() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", takeValueEvent);
  }
}
function clearAll() {
  getDisplay().value = 0;
  memValue = null;
  num1 = null;
  num2 = null;
  operation = null;
  result = null;
  unHighlightOperator();
  haveToRestoreAllButtons = true;
  updateButtonStatus();
}
function clearDisplay() {
  getDisplay().value = 0;
  haveToRestoreAllButtons = true;
  updateButtonStatus();
}
function clearMemory() {
  memValue = null;
  result = null;
}
function checkDisplayableValue(value) {
  if (isSignToggleButton(value)) {
    toggleDisplayNumSign();
  } else {
    if (isComma(value)) {
      if (isDisplayClear()) {
        value = "0,";
      }
      haveToDisableCommaButton = true;
    } else if (isCero(value)) {
      if (isDisplayClear()) {
        haveToDisableCeroButton = true
        updateButtonStatus()
        return;
      }
    }
    displayAddValue(value);
  }  
  if (!hasDisplaySpace(getDisplay().value))  {
    haveToDisableDisplayableButtons = true;
  }
  updateButtonStatus();

}
function checkNotDisplayableValue(value) {
  if (isOperator(value)) {
    saveValues(value);
  } else if (isClearButton(value)) {
    clearAll();
  } else if (isEventButton(value)) {
    saveSecondNumber();
    even();
  }
}
function calculate() {
  if (operation == null) {
    return;
  }
  if (isNaN(num1)) {
    num1 = 0;
  }
  if (isNaN(num2) || isCero(num2)) {
    return errorMsg();
  }
  return operation(num1, num2);
}
function canDisplay(value) {
  if (value.length <= 10) {
    return true;
  } else if (
    value.length <= 11 &&
    (value.includes(",") || value.includes("-"))
  ) {
    return true;
  } else if (value.length <= 12 && value.includes(",") && value.includes("-")) {
    return true;
  } else {
    disableDisplayableButtons();
    return false;
  }
}
function cutDecimal(value) {
  let maxLength = value.includes("-") ? 12 : 11;
  let commaIndex = value.indexOf(".");
  if (maxLength < commaIndex) {
    return errorMsg();
  }
  value = parseFloat(value).toFixed(maxLength - commaIndex);
  for (let i = value.length - 1; i > 0; i--) {
    if (value[i] != 0 && value.length <= maxLength) {
      break;
    } else {
      value = value.slice(0, i);
    }
  }
  return value.toString();
}
function disableDisplayableButtons() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i].classList.contains("sign")) {
      keys[i].setAttribute("disabled", true);
    }
  }
  areDisplayableButtonsDisabled = true;
}
function disableAllButtons() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].id != "clear") {
      keys[i].setAttribute("disabled", true);
    }
  }
  areOperatorButtonsDisabled = true;
  areDisplayableButtonsDisabled = true;
}
function disableCommaButton() {
  document.getElementById("comma").setAttribute("disabled", true);
}
function disableCeroButton() {
  document.getElementById("num-0").setAttribute("disabled", true);
}
function disableSignToggleButton() {
  document.getElementById("signToggle").setAttribute("disabled", true);
}
function displayAddValue(value) {
  let display = getDisplay();
  if (display.value == 0) {
    display.value = value;
  } else {
    display.value += value;
  }
}
function divition(num1, num2) {
  return num1 / num2;
}
function enableButtons() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].removeAttribute("disabled");
  }
}
function enableCommaButton() {
  document.getElementById("comma").removeAttribute("disabled");
}
function enableCeroButton() {
  document.getElementById("num-0").removeAttribute("disabled");
}
function enableSignToggleButton() {
  document.getElementById("signToggle").removeAttribute("disabled");
}
function even() {
  result = calculate();
  unHighlightOperator();
  if (result == null) {
    return;
  } else if (isNaN(result)) {
    result = errorMsg();
  }
  result = result.toString()
  let displayableResult 

  if (isDecimal(result)) {
    result = cutDecimal(result);
    haveToDisableCommaButton = true;
  }
  displayableResult = toggleComma(result);
  if (canDisplay(displayableResult) && displayableResult != "ERROR") {
    clearDisplay();
    if (isCero(displayableResult)){
      haveToDisableCeroButton = true;
    }
    displayAddValue(displayableResult);
    haveToDisableSignToggleButton = true;
  } else {
    clearDisplay();
    displayAddValue(errorMsg());
  }
  num1 = null;
  num2 = null;
  updateButtonStatus()

}
function errorMsg() {
  return "ERROR";
}
function getDisplay() {
  return document.getElementById("display");
}
function haveToClearDisplay(value) {
  if (
    (result != null && !isOperator(value)) ||
    (!isOperator(value) && operation != null && memValue != null)
  ) {
    return true;
  } else {
    return false;
  }
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
    // disableDisplayableButtons();
    return false;
  }
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
function isDecimal(value) {
  return value.includes(",") || value.includes(".");
}
function isNumberDisplayed(value) {
  for (let i = 0; i < value.length; i++) {
    if (Number(value[i]) && value[i] != 0) {
      return true;
    }
  }
  return false;
}
function isCero(value) {
  return value == "0";
}
function isDisplayClear() {
  return getDisplay().value == 0;
}
function isOperator(value) {
  return ["+", "-", "/", "*", "x"].includes(value);
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
function isComma(value) {
  return value == ",";
}
function isFirstElement() {
  let displayValue = getDisplay().value;
  if (displayValue == 0) {
    return "0,";
  } else if (!isDecimal(displayValue)) {
    return ",";
  } else {
    return null;
  }
}
function isDisplayable(value) {
  let digit = /\d/;
  return (
    digit.test(value) || value == "," || value == "Control" || value == "+/-"
  );
}
function isAllowedKey(key) {
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
  ).includes(key);
}
function isDisplayableValueKey(key) {
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
    "Control"
  ).includes(key);
}
function isOperatorValueKey(key) {
  return Array("/", "*", "-", "+", "Enter").includes(key);
}
function isClearValueKey(key) {
  return "Escape" == key;
}
function keyBoardEvent() {
  document.addEventListener("keydown", keyBoard);
}
function keyBoard(event) {
  if (isAllowedKey(event.key)) {
    event.preventDefault();
    if (
      (!areDisplayableButtonsDisabled && isDisplayableValueKey(event.key)) ||
      (!areOperatorButtonsDisabled && isOperatorValueKey(event.key)) ||
      isClearValueKey(event.key) || isSignToggleButton(event.key))
     {
      takeValue(event.key);
    }
  }
}
function multiplication(num1, num2) {
  return num1 * num2;
}
function restoreDisplayableButtons() {
  areDisplayableButtonsDisabled = false;
  enableButtons();
  disableCeroButton();
  disableSignToggleButton();
}
function restoreAllButtons() {
  areOperatorButtonsDisabled = false;
  areDisplayableButtonsDisabled = false;
  enableButtons();
  disableCeroButton();
  disableSignToggleButton();
}
function saveInMemory() {
  let value = getDisplay().value;
  memValue = toggleComma(value);
}
function saveFirstNumber() {
  saveInMemory();

  num1 = parseFloat(memValue);
}
function saveSecondNumber() {
  saveInMemory();
  num2 = parseFloat(memValue);
}
function saveValues(value) {
  if (displayWasCleared) {
    saveSecondNumber();
    toggleDisplayWasCleared();
  }
  if (num1 != null && num2 != null && operation != null) {
    even();
    if (getDisplay().value == errorMsg()) {
      return;
    }
    saveFirstNumber();
  } else {
    saveFirstNumber();
  }
  operation = assignOperation(value);
  haveToRestoreDisplayableButtons = true;
  haveToDisableCeroButton = false;
  haveToDisableCommaButton = true;
  haveToDisableSignToggleButton = true;
  updateButtonStatus();
  highlightOperator(value);
}
function substraction(num1, num2) {
  return num1 - num2;
}
function takeValueEvent(Event) {
  takeValue(Event.currentTarget.textContent);
}
function takeValue(value) {
  if (haveToClearDisplay(value)) {
    clearMemory();
    clearDisplay();
    toggleDisplayWasCleared();
  }
  if (isDisplayable(value)) {
    checkDisplayableValue(value);
  } else {
    checkNotDisplayableValue(value);
  }
}
function toggleDisplayWasCleared() {
  displayWasCleared = !displayWasCleared;
}
function toggleComma(value) {
  if (value.includes(",")) {
    value = value.replace(",", ".");
  } else if (value.includes(".")) {
    value = value.replace(".", ",");
  }
  return value;
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
function updateButtonStatus() {
  if (haveToRestoreAllButtons) {
    restoreAllButtons();
    haveToRestoreAllButtons = false;
  }
  if (haveToRestoreDisplayableButtons) {
    restoreDisplayableButtons();
    haveToRestoreDisplayableButtons = false;
  }
  if (!isNumberDisplayed(getDisplay().value) || haveToDisableSignToggleButton) {
    disableSignToggleButton();
    haveToDisableSignToggleButton = false;
  } else {
    enableSignToggleButton();
  }
  if (isDecimal(getDisplay().value)) {
    disableCommaButton();
    haveToDisableCommaButton = false;
  } else {
    enableCommaButton();
  }
  if (!isDisplayClear() || !haveToDisableCeroButton) {
    enableCeroButton();
  } else {
    disableCeroButton();
  }
  if (getDisplay().value.includes("ERROR")) {
    disableAllButtons();
  } else if (haveToDisableDisplayableButtons) {
    disableDisplayableButtons();
    haveToDisableDisplayableButtons = false;
  }

}
function unHighlightOperator() {
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove("highlightedOperator");
  }
}
