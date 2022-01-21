import "@testing-library/jest-dom";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { DefaultProps } from "../../../../common/interfaces/DefaultProps";
import {
  cryptoReducer,
  StoreCoin,
  StoreCoinData
} from "../../../../state/crypto";
import { Filters } from "./Filters";

type StateInitial = { initialState: any & { [key: string]: any } };

export const renderWithState = (
  ui: React.ReactElement,
  { initialState, ...renderOptions } = {} as StateInitial
): RenderResult => {
  const store = createStore(cryptoReducer as any, initialState);

  const Wrapper = ({ children }: DefaultProps) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

const mockCoin: StoreCoinData = {
  id: "32722",
  symbol: "UBT",
  name: "Unibright",
  nameid: "unibright",
  rank: 202,
  price_usd: "1.10",
  percent_change_24h: "-5.53",
  percent_change_1h: "1.91",
  percent_change_7d: "-11.82",
  price_btc: "0.000028",
  market_cap_usd: "165555242.85",
  volume24: 2134788.892829923,
  volume24a: 1261058.7159657576,
  csupply: "149999999.00",
  tsupply: "150000000",
  msupply: "150000000"
};

describe("Filters of coins", () => {
  let initialState: StoreCoin;
  beforeEach(() => {
    initialState = {
      detail: { name: "" },
      coins: [mockCoin],
      coinsFiltered: [],
      filters: {
        hasFilters: true,
        price: "1",
        search: "Search Unibright",
        cap: "2"
      }
    };
  });

  test("Map data initial of fields of store global 'filters'", () => {
    const component = renderWithState(<Filters />, { initialState });

    const inputElement = component.getByLabelText("Search coins");

    expect(inputElement).toHaveValue(initialState.filters.search);
  });

  test("It should clear filter if exits and hide button", () => {
    const component = renderWithState(<Filters />, { initialState });

    const buttonClearFilter = component.getByRole("button");

    fireEvent.click(buttonClearFilter);

    const buttonRender = component.container.querySelector("[role=button]");
    const capSelectElement = component.getByLabelText("Filter by cap");
    const priceSelectElement = component.getByLabelText("Filter by price");

    expect(buttonRender).toBeNull();
    expect(capSelectElement).toHaveValue("0");
    expect(priceSelectElement).toHaveValue("0");
  });

  test("Allow filter by price", () => {
    const initialState: Partial<StoreCoin> = {
      coins: [mockCoin],
      coinsFiltered: [],
      filters: {
        hasFilters: false,
        price: "",
        search: "",
        cap: ""
      }
    };

    const component = renderWithState(<Filters />, { initialState });
    const priceSelectElement = component.getByLabelText("Filter by price");

    const $1_$10 = "5";

    fireEvent.change(priceSelectElement, { target: { value: $1_$10 } });

    component.getByRole("button");
  });

  test("Allow filter by cap", () => {
    const initialState: Partial<StoreCoin> = {
      coins: [mockCoin],
      coinsFiltered: [],
      filters: {
        hasFilters: false,
        price: "",
        search: "",
        cap: ""
      }
    };

    const component = renderWithState(<Filters />, { initialState });

    const priceSelectElement = component.getByLabelText("Filter by cap");

    const $100Millions_$1Billion = "5";

    fireEvent.change(priceSelectElement, {
      target: { value: $100Millions_$1Billion }
    });

    component.getByRole("button");
  });
});
