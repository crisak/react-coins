import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("With color primary", () => {
    const buttonComponent = render(<Button color="primary">Continue</Button>);

    expect(buttonComponent.container.firstChild).toHaveClass(
      "button--color-primary"
    );
  });

  test("With full width", () => {
    const buttonComponent = render(<Button size="full">Continue</Button>);

    expect(buttonComponent.container.firstChild).toHaveClass("button--full");
  });

  test("With icon", () => {
    const buttonComponent = render(
      <Button icon={<svg>{"<"}</svg>}> Icon</Button>
    );

    expect(buttonComponent.container.firstChild).toHaveClass("button--icon");
  });

  test("Button type basic", () => {
    const buttonComponent = render(
      <Button icon={<svg>{"<"}</svg>}> Icon</Button>
    );

    expect(buttonComponent.container.firstChild).toHaveClass("button--icon");
  });

  test("Allow custom class names", () => {
    const classNames = "space     custom-class-name btn-test    btn-pri ";
    const buttonComponent = render(
      <Button className={classNames}> Icon</Button>
    );

    expect(buttonComponent.container.firstChild).toHaveClass(classNames);
  });
});
