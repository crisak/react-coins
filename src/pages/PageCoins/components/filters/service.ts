import { Coin } from "../../../../common/services/coinlore/Coin";
import { clearText } from "../../../../common/utils";

interface Filters {
  hasFilters: boolean;
  price: string;
  search: string;
  cap: string;
}

interface ResponseFilter {
  coinsFiltered: Coin[];
  filters: Filters;
}

export const capListOptions = [
  { id: "0", value: "M. Cap (All)" },
  { id: "1", value: "> $1 Billion" },
  { id: "2", value: "$100 Millions - $1 Billion" },
  { id: "3", value: "$10 Millions - $100 Millions" },
  { id: "4", value: "$1 Millions - $10 Millions" },
  { id: "5", value: "$100K - $1 Million" },
  { id: "6", value: "< $100K" }
];
export const priceOptions = [
  { id: "0", value: " Price (All)" },
  { id: "1", value: "> $100" },
  { id: "2", value: "$50 - $100" },
  { id: "3", value: "$20 - $50" },
  { id: "4", value: "$10 - $20" },
  { id: "5", value: "$1 - $10" },
  { id: "6", value: "$0.01 - $1" },
  { id: "7", value: "$0.0001 - $0.01" },
  { id: "8", value: "< $0.0001" }
];

const hasFilters = ({ cap, search, price }: Filters): boolean => {
  return Boolean(cap || search || price);
};

const filterByText = (coin: Coin, textFilter: string) => {
  if (!textFilter) {
    return false;
  }

  for (const value of Object.values(coin)) {
    const valueSearch = clearText("" + textFilter);
    const valueField = clearText("" + value);
    if (valueField.includes(valueSearch)) {
      return true;
    }
  }
  return false;
};

const filterByCap = (typeFilter: string) => {
  const oneThousand = 1_000;
  const oneMillion = 1_000_000;
  const oneBillion = 1_000_000_000;
  /**
   * index filters with object
   * TODO create type dynamic
   */
  const filters: any = {
    "1": (priceCap: number) => {
      // { id: "1", value: "> $1 Billion" },
      return priceCap > oneMillion;
    },
    "2": (priceCap: number) => {
      //  { id: "2", value: "$100 Millions - $1 Billion" },
      const $100Millions = oneMillion * 100;
      return priceCap >= $100Millions && priceCap <= oneBillion;
    },
    "3": (priceCap: number) => {
      // { id: "3", value: "$10 Millions - $100 Millions" },
      const $10Millions = oneMillion * 10;
      const $100Millions = oneMillion * 100;
      return priceCap >= $10Millions && priceCap <= $100Millions;
    },
    "4": (priceCap: Number) => {
      // { id: "4", value: "$1 Millions - $10 Millions" },
      const $10Millions = oneMillion * 10;
      return priceCap >= oneMillion && priceCap <= $10Millions;
    },
    "5": (priceCap: number) => {
      // { id: "5", value: "$100K - $1 Million" }
      const $100Thousand = oneThousand * 100;
      return priceCap >= $100Thousand && priceCap <= oneMillion;
    },
    "6": (priceCap: number) => {
      // { id: "6", value: "< $100K" }
      const $100Thousand = oneThousand * 100;
      return priceCap <= $100Thousand;
    }
  };

  return ({ market_cap_usd }: Coin) => {
    const valueCap = +market_cap_usd;
    return filters[typeFilter](valueCap);
  };
};

const filterByPrice = (typeFilter: string) => {
  /**
   * index filters with object
   * TODO create type dynamic
   */
  const filters: any = {
    "1": (price: number) => {
      //  { id: "1", value: "> $100" },
      return price > 100;
    },
    "2": (priCap: number) => {
      //  { id: "2", value: "$50 - $100" }
      return priCap >= 50 && priCap <= 100;
    },
    "3": (priCap: number) => {
      // { id: "3", value: "$20 - $50" }
      return priCap >= 20 && priCap <= 50;
    },
    "4": (price: Number) => {
      // 	{ id: "4", value: "$10 - $20" }
      return price >= 10 && price <= 20;
    },
    "5": (price: number) => {
      //	{ id: "5", value: "$1 - $10" }
      return price >= 1 && price <= 10;
    },
    "6": (price: number) => {
      // { id: "6", value: "$0.01 - $1" },
      return price >= 0.01 && price <= 1;
    },
    "7": (price: number) => {
      // { id: "7", value: "$0.0001 - $0.01" },
      return price >= 0.0001 && price <= 0.01;
    },
    "8": (price: number) => {
      // { id: "8", value: "< $0.0001" }
      return price <= 0.0001;
    }
  };

  return ({ price_usd }: Coin) => {
    const priceUsd = +price_usd;
    if (isNaN(priceUsd)) {
      return false;
    }
    return filters[typeFilter](priceUsd);
  };
};

export const filterCoins = (filter: Filters, coins: Coin[]): ResponseFilter => {
  const { search, price, cap } = filter;
  if (!hasFilters(filter) || coins.length === 0) {
    return {
      filters: {
        hasFilters: false,
        search: "",
        price: "",
        cap: ""
      },
      coinsFiltered: []
    };
  }

  let coinsFiltered: Coin[] = coins;

  /**
   * Filter by cap
   */
  const typeFilterCap = capListOptions.find(({ id }) => id === filter.cap);
  const existsFilterCap = Boolean(typeFilterCap);

  if (filter.cap && existsFilterCap && typeFilterCap?.id !== "0") {
    const fnFilterCoin = filterByCap(filter.cap);

    coinsFiltered = coinsFiltered.filter((coin) => {
      return fnFilterCoin(coin);
    });
  }

  /**
   * Filter by price usd
   */
  const typeFilterPrice = priceOptions.find(({ id }) => id === filter.price);
  const existsFilterPrice = Boolean(typeFilterPrice);

  if (filter.price && existsFilterPrice && typeFilterPrice?.id !== "0") {
    const fnFilterCoin = filterByPrice(filter.price);

    coinsFiltered = coinsFiltered.filter((coin) => {
      return fnFilterCoin(coin);
    });
  }

  /**
   * Filter by text
   */
  if (filter.search) {
    coinsFiltered = coinsFiltered.filter((coin) => {
      return filterByText(coin, filter.search);
    });
  }

  return {
    filters: {
      hasFilters: true,
      search,
      price,
      cap
    },
    coinsFiltered: coinsFiltered || []
  };
};
