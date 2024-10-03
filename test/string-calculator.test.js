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

  it("should return the sum of input value if comma-separated input values is sent", () => {
    stringCalculator.value = "1,5";
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(6);
  });

  it("should return the sum of input value if \n separated input values is sent", () => {
    stringCalculator.value = "1\n2\n3\n4";
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(10);
  });

  it("should return the sum of input value if combination of \n separated and comma-separated input values is sent", () => {
    stringCalculator.value = "1\n2\n3\n4,5,6\n7";
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(28);
  });

  it("should successfully return the sum of input value if custom delimiter ; is specified", () => {
    stringCalculator.value = "//;\n1;2;3;4,5,6;7";
    stringCalculator.addString();
    expect(stringCalculator.result).toBe(28);
  });
});
