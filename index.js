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

    const nums = this.value.split(this.delimiters);
    this.result = nums.reduce((acc, item) => {
      acc += parseInt(item);
      return acc;
    }, 0);
  }
}

export default StringCalculator;
