class StringCalculator {
  constructor() {
    this.value = "";
    this.result = 0;
    this.delimiters = /,|\n/;
    this.setUpElements();
    this.registerEvents();
  }

  setUpElements() {
    this.inputElem = document.querySelector(".calculator__input");
    this.addBtnElem = document.querySelector(".calculator__button-add");
    this.clearBtnElem = document.querySelector(".calculator__button-clear");
    this.outputElem = document.querySelector(".calculator__output-value");
    this.errorElem = document.querySelector(".calculator__error");
  }

  hasCustomDelimiter() {
    return /^\/\//.test(this.value);
  }

  expandDelimiters() {
    this.delimiters = new RegExp(
      this.delimiters.source + "|" + this.value.split("\n")[0][2]
    );
  }

  addString() {
    if (this.value.trim() === "") {
      this.result = 0;
      this.setOutput(this.result);
      return;
    }

    if (this.hasCustomDelimiter()) {
      this.expandDelimiters();
      this.value = this.value.slice(this.value.split("\n")[0].length + 1);
    }

    let negativeNumTracker = [];
    try {
      const nums = this.value.split(this.delimiters);
      this.result = nums.reduce((acc, item) => {
        if (parseInt(item) > 0) {
          acc += parseInt(item);
        } else {
          if (parseInt(item) < 0) {
            negativeNumTracker = negativeNumTracker.concat(parseInt(item));
          } else {
            throw new Error("Input contains invalid characters");
          }
        }
        return acc;
      }, 0);
      if (negativeNumTracker.length) {
        throw new Error(
          "Negative numbers are not allowed: " + negativeNumTracker.join(",")
        );
      }

      this.setOutput(this.result);
    } catch (e) {
      this.setError(e.message);
      this.hideOutput();
      console.log(e);
      throw e;
    }
  }

  setInputValue(e) {
    this.value = e.code === "Enter" ? "\n" : e.target.value;
    if (this.value.trim() === "") {
      this.hideError();
      this.resetOutput();
    }
  }

  setError(msg) {
    this.showError();
    this.errorElem.innerHTML = msg;
  }

  setOutput(value = 0) {
    this.showOutput();
    this.outputElem.innerHTML = value;
  }

  clearString() {
    this.inputElem.value = "";
    this.value = "";
    this.hideError();
  }

  showOutput() {
    this.outputElem.parentNode.style.visibility = "visible";
  }

  hideOutput() {
    this.outputElem.parentNode.style.visibility = "hidden";
  }

  resetOutput() {
    this.outputElem.innerHTML = 0;
  }

  hideError() {
    this.errorElem.style.display = "none";
  }

  showError() {
    this.errorElem.style.display = "block";
  }

  registerEvents() {
    const self = this;
    document.addEventListener("DOMContentLoaded", () => {
      self.inputElem.addEventListener("keyup", (e) => {
        self.setInputValue(e);
      });

      self.addBtnElem.addEventListener("click", () => {
        self.addString();
      });

      self.clearBtnElem.addEventListener("click", () => {
        self.clearString();
        self.resetOutput();
      });
    });
  }
}

new StringCalculator();

export default StringCalculator;
