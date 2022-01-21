import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageNotFound } from "./PageNotFound";

describe("PageNotFound", () => {
  test("Load page of detail", () => {
    const component = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(component).toBeDefined();
  });
});
