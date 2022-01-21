import { CONFIG } from "../../../config";
import { Coin } from "./Coin";

export interface ResponseApi {
  data: Coin[];
  info: {
    coins_num: number;
    time: number;
  };
}

export const getAllCoins = async (
  page: number = 1,
  limit = 100
): Promise<ResponseApi> => {
  /**
   * api
   */
  const endList = page * limit;
  const startList = endList - (limit - 1);
  const response = await fetch(
    `${CONFIG.API_COINLORE}/tickers/?start=${startList}&limit=${endList}`
  );
  const data = await response.json();
  return data;
};

export const getDetail = async (coinId: string) => {
  const response = await fetch(`${CONFIG.API_COINLORE}/ticker/?id=${coinId}`);
  const data = await response.json();
  return data;
};
