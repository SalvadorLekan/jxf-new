import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  offset: "left-full",
  cartItems: {} as CartItems,
};

const orderSlice = createSlice({
  name: "order",
  reducers: {
    showCart(state) {
      state.offset = "left-0";
    },
    closeCart(state) {
      state.offset = "left-full";
    },
    addToCart({ cartItems }, { payload }: PayloadAction<AddToCart>) {
      if (!(payload.shopSlug in cartItems)) cartItems[payload.shopSlug] = {};

      cartItems[payload.shopSlug][payload.item.productSlug] = {
        item: payload.item,
        amount: payload.number,
      };
    },
    removeFromCart({ cartItems }, { payload }: PayloadAction<RemoveFromCart>) {
      delete cartItems[payload.shopSlug][payload.item.productSlug];
    },
    increaseItem({ cartItems }, { payload }: PayloadAction<RemoveFromCart>) {
      cartItems[payload.shopSlug][payload.item.productSlug].amount++;
    },
    decreaseItem(state, { payload }: PayloadAction<RemoveFromCart>) {
      const { cartItems } = state;
      let { amount } = cartItems[payload.shopSlug][payload.item.productSlug];

      if (amount === 1)
        delete cartItems[payload.shopSlug][payload.item.productSlug];
      else cartItems[payload.shopSlug][payload.item.productSlug].amount--;
    },
    clearCart(state, { payload }: PayloadAction<string>) {
      delete state.cartItems[payload];
    },
  },
  initialState,
});

export default orderSlice.reducer;

export const {
  showCart,
  closeCart,
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = orderSlice.actions;
