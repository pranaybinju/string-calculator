/**
 * @jest-environment jsdom
 */

import StringCalculator from "../index.js";

// StringCalculator.mockImplementation(() => {
//   return {
//     setUpElements: setUpElements,
//     setOutput: setOutput,
//     setInput: setInput,
//     setError: setError,
//   };
// });

describe("String Calculator", () => {
  let stringCalculator;

  beforeEach(() => {
    const setUpElementsMock = jest
      .spyOn(StringCalculator.prototype, "setUpElements")
      .mockImplementation(() => {
        console.log("mocked setUpElements");
      });

    stringCalculator = new StringCalculator();

    stringCalculator.setOutput = () => {};
    stringCalculator.setInput = () => {};
    stringCalculator.setError = () => {};
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

  it("should throw Error if negative numbers are passed in input value", () => {
    stringCalculator.value = "-1,-2,3";

    expect(() => stringCalculator.addString()).toThrow(
      new Error("Negative numbers are not allowed: -1,-2")
    );
  });
});
