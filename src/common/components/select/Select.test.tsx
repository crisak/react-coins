import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Select } from "./Selects";

describe("Select", () => {
  test("Allow custom class names", () => {
    const classNames = "space     custom-class-name btn-test    select-pri ";
    const buttonComponent = render(
      <Select className={classNames} items={[]} />
    );

    expect(buttonComponent.container.firstChild).toHaveClass(classNames);
  });
});
