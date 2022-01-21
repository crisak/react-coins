import {
  COINS_CLEAR_LIST,
  COINS_PUSH_LIST,
  COINS_SAVE_LIST_FILTERED,
  COINS_SAVE_FILTER,
  COINS_SAVE_LIST
} from "./coinsTypes";

export const pushCoins = (content: any[]) => {
  return {
    type: COINS_PUSH_LIST,
    payload: content
  };
};

export const saveCoins = (content: any[]) => {
  return {
    type: COINS_SAVE_LIST,
    payload: content
  };
};

export const clearCoins = () => {
  return {
    type: COINS_CLEAR_LIST,
    payload: null
  };
};

export const saveFilter = (content: any) => {
  return {
    type: COINS_SAVE_FILTER,
    payload: content
  };
};

export const saveCoinsFiltered = (content: any[]) => {
  return {
    type: COINS_SAVE_LIST_FILTERED,
    payload: content
  };
};
