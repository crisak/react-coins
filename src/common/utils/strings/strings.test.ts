import "@testing-library/react";
import { concatString } from "./strings";

describe("Strings", () => {
  describe("concatString", () => {
    test("Concat several strings without spaces start and end text", () => {
      const textList = ["btn", "btn--primary", "btn--block", 235];
      const result = concatString(textList);

      expect(result).toEqual("btn btn--primary btn--block 235");
    });

    test("Return string without element duplicate", () => {
      const textList = ["btn", 235, "btn--primary", "btn", 235];

      const result = concatString(textList);

      expect(result).toEqual("btn 235 btn--primary");
    });

    test("Remove elements in falsy such as (undefined, null, '', false)", () => {
      const textList = [undefined, 235, "", "btn--primary", null, false];

      const result = concatString(textList);

      expect(result).toEqual("235 btn--primary");
    });
  });
});
