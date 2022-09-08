var memValue = null;
var num1 = null;
var num2 = null;
var result;
var operation;
var displayWasCleared = false;
var areDisplayableButtonsDisabled = false; // badname
var areOperatorButtonsDisabled = false;
var haveToDisableSignToggleButton = true;
var haveToDisableCommaButton = false;
var haveToDisableZeroButton = true; //Zero
var haveToDisableDisplayableButtons = false;
var haveToRestoreAllButtons = false;
var haveToRestoreDisplayableButtons = false;
addEvents();
//reset ??
updateButtonStatus();

function addEvents() {
  buttonsEvents(); //addButtonsEventss
  keyBoardEvent(); //addKeyboardEvents
}

function buttonsEvents() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", takeValueEvent); // takeValue a secas, no es un evento
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
        haveToDisableZeroButton = true;
        updateButtonStatus();
        return;
      }
    }
    displayAddValue(value);
  }
  if (!hasDisplaySpace(getDisplay().value)) {
    haveToDisableDisplayableButtons = true;
  }
  updateButtonStatus();
}

function checkNotDisplayableValue(value) {
  if (isOperator(value)) {
    console.log("operador");
    saveValues(value);
  } else if (isClearButton(value)) {
    clearAll();
  } else if (isEvenButton(value)) {
    saveSecondNumber();
    even();
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

function displayAddValue(value) {
  let display = getDisplay();
  if (display.value == 0) {
    display.value = value;
  } else {
    display.value += value;
  }
}

function errorMsg() {
  return "ERROR";
}

function getDisplay() {
  return document.getElementById("display");
}

function isDecimal(value) {
  return value.includes(",") || value.includes(".");
}

function isCero(value) {
  return value == "0";
}

function isOperator(value) {
  return ["+", "-", "/", "*", "x"].includes(value);
}
function isClearButton(value) {
  return ["Escape", "C"].includes(value);
}
function isEvenButton(value) {
  // even != event
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
      isClearValueKey(event.key) ||
      isSignToggleButton(event.key)
    ) {
      takeValue(event.key);
    }
  }
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
  console.log("saveValues");
  console.log(num1);
  console.log(num2);

  if (haveToSaveSecondNum()) {
    console.log(displayWasCleared);
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
  haveToDisableZeroButton = true;
  haveToDisableCommaButton = true;
  haveToDisableSignToggleButton = true;
  updateButtonStatus();
  highlightOperator(value);
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
function removeLastComma(displayValue){
  if (displayValue[displayValue.length-1] == ','){
    getDisplay().value = displayValue.slice(0,-1)
  }
}
function haveToSaveSecondNum(){
  if (displayWasCleared && num1 != null && num1 != 0){
    return true
  }
}