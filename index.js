class StringCalculator {
  constructor() {
    this.value = "";
    this.result = 0;
    this.delimiters = /,|\n/;
  }

  addString() {
    if (this.value.trim() === "") {
      this.result = 0;
      return;
    }

    const nums = this.value.split(this.delimiters);
    this.result = nums.reduce((acc, item) => {
      acc += parseInt(item);
      return acc;
    }, 0);
  }
}

export default StringCalculator;
