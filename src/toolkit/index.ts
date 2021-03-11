import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import shopReducer from "./slice/shop";
import cartReducer from "./slice/cart";
import order from "./slice/order";

enableMapSet();

const store = configureStore({
  reducer: { cartReducer, shopReducer, order },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
