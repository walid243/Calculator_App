// module.exports = addition;
addEvents();
function addEvents() {
  clearButtonEvent();
  numberButtonsEvent();
  operatorButtonsEvent();
  equalButtonEvent();
  keyBoardEvent();
}
function clearButtonEvent() {
  document.getElementById("clear").addEventListener("click", clearAll);
}

function numberButtonsEvent() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i].classList.contains("sign")) {
      keys[i].addEventListener("click", function (Event) {
        takeValue(Event.currentTarget.textContent);
      });
    }
  }
}

function operatorButtonsEvent() {
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", highlightOperator);
  }
}

function equalButtonEvent() {
  document.getElementById("equal").addEventListener("click", equaling);
}
function keyBoardEvent() {
  document.addEventListener("keydown", keyBoard);
}
function getDisplayValue() {
  return document.getElementById("display").value;
}

function clearAll() {
  document.getElementById("display").value = null;
  unHighlightOperator();
}
function takeValue(value) {
  console.log(value);
  if (hasSpaceLeft())
    if (value != 0 || (value == 0 && getDisplayValue() != 0)) {
      if (isComma(value)) {
        value = isFirstComma(value);
      }
      if (isDisplayable(value)) {
        displayAddValue(value);
      } else {
        if (isClearButton(value)) {
          console.log(value + " -> Clear");
        } else if (isEventButton(value)) {
          console.log(value + " -> =");
        } else if (isSignToggleButton(value)) {
          console.log(value + " -> +/-");
        }
      }
    }
}
function isClearButton(value) {
  return ["Escape", "Backspace", "C"].includes(value);
}
function isEventButton(value) {}
function isSignToggleButton(value) {}
function hasSpaceLeft() {
  if (getDisplayValue().length <= 10) {
    return true;
  }
}
function isComma(value) {
  return value == "," || value == ".";
}
function isFirstComma(value) {
  if (getDisplayValue() == 0) {
    return "0,";
  } else if (!getDisplayValue().includes(value)) {
    return ",";
  }
  return null;
}
function isDisplayable(value) {
  let digit = /\d/;
  return digit.test(value) || value == ",";
}
function dotToComma(value) {
  if (value == ".") {
    return ",";
  }
}
function displayAddValue(value) {
  let display = document.getElementById("display");

  display.value += value;
}
function addition(a, b) {
  return a + b;
}

function highlightOperator(event) {
  unHighlightOperator();
  event.currentTarget.classList.add("highlightedOperator");
}
function unHighlightOperator() {
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove("highlightedOperator");
  }
}
function equaling() {
  unHighlightOperator();
}

function keyBoard(event) {
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
    ".",
    "/",
    "*",
    "-",
    "+",
    "Enter",
    "Escape",
    "Backspace",
    "Control"
  );
}
