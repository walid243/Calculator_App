// module.exports = addition;
addEvents()
function addEvents(){
    clearButtonEvent()
    numberButtonsEvent()
    operatorButtonsEvent()
    equalButtonEvent()
}
function clearButtonEvent(){
    document.getElementById("clear").addEventListener("click", clearDisplay);
}
function numberButtonsEvent(){
    let keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
      if (!keys[i].classList.contains("sign")) {
        keys[i].addEventListener("click", takeValue);
      }
    }
}
function operatorButtonsEvent(){
    let operators = document.getElementsByClassName("operator");
    for (let i = 0; i < operators.length; i++) {
      operators[i].addEventListener("click", highlightOperator);
    }
}
function equalButtonEvent(){
    document.getElementById("equal").addEventListener("click", equaling)
}
function getDisplayValue() {
  return document.getElementById("display").value;
}

function clearDisplay() {
  document.getElementById("display").value = null;
  unHighlightOperator();
}
function takeValue(event) {
  let triger = event.currentTarget.textContent;

  if (triger != 0 || (triger == 0 && getDisplayValue() != 0)) {
    triger = isFirstDot(triger);
    if (isDisplayable(triger)) {
      displayAddValue(triger);
    }
  }
}
function isFirstDot(triger) {
  if (triger == "," && getDisplayValue() == 0) {
    return "0,";
  } else if (getDisplayValue().includes(",") && triger == ",") {
    return null;
  } else {
    return triger;
  }
}
function isDisplayable(triger) {
  let digit = /\d/;
  return digit.test(triger) || triger == ",";
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
function equaling(){
    unHighlightOperator()
}