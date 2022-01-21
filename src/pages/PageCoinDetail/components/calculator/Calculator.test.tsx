import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { currencyFormat } from "../../../../common/utils";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  test("When change input amount, calculate crypto to coin in usd", () => {
    const props = {
      toMoney: "USD",
      amount: 1,
      coin: "ETH Ethereum",
      equivalent: "3000"
    };

    const newValue = 2;

    const total = currencyFormat(newValue * +props.equivalent);

    const component = render(<Calculator {...props} />);
    const input = component.container.querySelector("[name=amount]");

    fireEvent.change(input as any, { target: { value: newValue.toString() } });

    component.getByText(total);
  });

  test("When change input amount, should calculate the value total only with numbers characters", () => {
    const props = {
      toMoney: "USD",
      amount: 1,
      coin: "ETH Ethereum",
      equivalent: "3000"
    };

    const valuesErrors = [
      "null",
      "",
      "809234number string",
      undefined,
      null,
      false
    ];

    const component = render(<Calculator {...props} />);
    const input = component.container.querySelector("[name=amount]");

    for (const value of valuesErrors) {
      fireEvent.change(input as any, {
        target: { value: String(value) }
      });

      const divResult = component.getByLabelText("Total conversion");

      expect(divResult).toHaveTextContent("$3,000.00");
    }
  });
});
