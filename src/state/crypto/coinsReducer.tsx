import { Action, Reducer } from "../../common/interfaces/Redux";
import { StoreCoin } from "./coinsInterface";
import {
  COINS_PUSH_LIST,
  COINS_SAVE_LIST,
  COINS_CLEAR_LIST,
  COINS_SAVE_FILTER,
  COINS_SAVE_LIST_FILTERED
} from "./coinsTypes";

const initialState: StoreCoin = {
  detail: {
    name: ""
  },
  coins: [],
  filters: {
    hasFilters: false,
    price: "",
    search: "",
    cap: ""
  },
  coinsFiltered: []
};

export const cryptoReducer: Reducer<StoreCoin> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case COINS_PUSH_LIST:
      return {
        ...state,
        coins: [...state.coins, ...action.payload]
      };

    case COINS_SAVE_LIST:
      return {
        ...state,
        coins: [...action.payload]
      };
    case COINS_CLEAR_LIST:
      return {
        ...state,
        filters: { ...initialState.filters },
        coins: [],
        coinsFiltered: []
      };
    case COINS_SAVE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case COINS_SAVE_LIST_FILTERED:
      return {
        ...state,
        coinsFiltered: [...action.payload]
      };

    default:
      return state;
  }
};
