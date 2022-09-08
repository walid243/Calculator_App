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
  function divition(num1, num2) {
    return num1 / num2;
  }
  function multiplication(num1, num2) {
    return num1 * num2;
  }
  function substraction(num1, num2) {
    return num1 - num2;
  }
  function even() {
    result = calculate()
    removeLastComma(getDisplay().value)
    unHighlightOperator();
    if (result == null) {
      return;
    } else if (isNaN(result)) {
      result = errorMsg();
    }
    result = result.toString()
    let displayableResult; 
    if (isDecimal(result)) {
      result = cutDecimal(result);
      haveToDisableCommaButton = true;
    }
    displayableResult = toggleComma(result);
    if (canDisplay(displayableResult) && displayableResult != "ERROR") {
      clearDisplay();
      if (isCero(displayableResult)){
        haveToDisableZeroButton = true;
      }
      displayAddValue(displayableResult);
      haveToDisableSignToggleButton = true;
      console.log("yes");
    } else {
      clearDisplay();
      displayAddValue(errorMsg());
    }
    num1 = null;
    num2 = null;
    updateButtonStatus()
  }