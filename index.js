class StringCalculator {
  constructor() {
    this.value = "";
    this.result = 0;
  }

  addString() {
    if (this.value.trim() === "") {
      this.result = 0;
      return;
    }

    const num = this.value.split(",");

    this.result = num.reduce((acc, item) => {
      acc += parseInt(item);
      return acc;
    }, 0);
  }
}

export default StringCalculator;
