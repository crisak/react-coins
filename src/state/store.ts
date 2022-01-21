import { createStore } from "redux";
import { cryptoReducer } from "./crypto";
// import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(cryptoReducer as any);
