import "@testing-library/react";
import { currencyFormat } from "./currency";

describe("currency", () => {
  test("Return $0 if value is falsy or not is number", () => {
    const valuesFalsy = [{}, null, undefined, "test", false, true];
    let results = [];

    for (const value of valuesFalsy) {
      results.push(currencyFormat(value as any));
    }

    for (const result of results) {
      expect(result).toEqual("$0.00");
    }
  });
});
