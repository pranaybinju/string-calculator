class StringCalculator {
  constructor() {
    this.value = "";
    this.result = 0;
    this.delimiters = /,|\n/;
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
          negativeNumTracker = negativeNumTracker.concat(parseInt(item));
        }
        return acc;
      }, 0);
      if (negativeNumTracker.length) {
        throw new Error(
          "Negative numbers are not allowed: " + negativeNumTracker.join(",")
        );
      }
    } catch (e) {
      // TODO: update in dom
      console.log(e);
      throw e;
    }
  }
}

export default StringCalculator;
