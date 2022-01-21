import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  test("Render label on input", () => {
    const inputComponent = render(<Input label="Test name" />);
    inputComponent.getByLabelText("Test name");
  });

  test("Allow put class names custom", () => {
    const className = "input-custom-class";
    const inputComponent = render(
      <Input className={className} label="Test name" />
    );

    expect(inputComponent.container.firstChild).toHaveClass(className);
  });
});
