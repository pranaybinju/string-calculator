import StringCalculator from "../index.js";

describe("String Calculator", () => {
  let stringCalculator;
  beforeEach(() => {
    stringCalculator = new StringCalculator();
  });

  it("should return 0 if input value is empty string", () => {
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(0);
  });

  it("should return the input value if single input value is sent", () => {
    stringCalculator.value = "123";
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(parseInt(stringCalculator.value));
  });
});
