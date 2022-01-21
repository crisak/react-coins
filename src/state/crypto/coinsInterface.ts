export interface StoreCoinData {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

export interface StoreFilters {
  hasFilters: boolean;
  price: string;
  search: string;
  cap: string;
}

export interface StoreCoin {
  detail: {
    name: string;
  };
  coins: StoreCoinData[];
  filters: StoreFilters;
  coinsFiltered: StoreCoinData[];
}
