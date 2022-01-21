import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageCoinDetail } from "./PageCoinDetail";

describe("PageCoinDetail", () => {
  test("Load page of detail", () => {
    const component = render(
      <BrowserRouter>
        <PageCoinDetail />
      </BrowserRouter>
    );

    expect(component).toBeDefined();
  });
});
