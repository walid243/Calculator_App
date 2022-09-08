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
function isNumberDisplayed(value) {
  for (let i = 0; i < value.length; i++) {
    if (Number(value[i]) && value[i] != 0) {
      return true;
    }
  }
  return false;
}
function isDisplayClear() {
  return getDisplay().value == 0;
}
function isDisplayable(value) {
  let digit = /\d/;
  return (
    digit.test(value) || value == "," || value == "Control" || value == "+/-"
  );
}
function toggleDisplayWasCleared() {
  displayWasCleared = !displayWasCleared;
}
