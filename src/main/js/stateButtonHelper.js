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

function disableDisplayableButtons() {
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i].classList.contains("sign")) {
      keys[i].setAttribute("disabled", true);
    }
  }
  areDisplayableButtonsDisabled = true;
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
  if (haveToDisableZeroButton || isDisplayClear()) {
    disableCeroButton();
    haveToDisableZeroButton = false;
  } else {
    enableCeroButton();
  }
  if (getDisplay().value.includes("ERROR")) {
    disableAllButtons();
  } else if (haveToDisableDisplayableButtons) {
    disableDisplayableButtons();
    haveToDisableDisplayableButtons = false;
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

function unHighlightOperator() {
  let operators = document.getElementsByClassName("operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove("highlightedOperator");
  }
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