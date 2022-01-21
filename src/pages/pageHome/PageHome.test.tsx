import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageHome } from "./PageHome";

describe("PageHome", () => {
  test("Load page home with the routers", () => {
    const component = render(
      <BrowserRouter>
        <PageHome />
      </BrowserRouter>
    );

    expect(component).toBeDefined();
  });
});
