import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = { status: "initial" as OrderStatus, payload: {} };

export const sendOrder = createAsyncThunk(
  "send/order",
  async function (params: { order: OrderToServer[]; shop: string }) {
    let res = await fetch(
      `https://manifest-salesapi.herokuapp.com/shops/${params.shop}/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: params.order,
        }),
      }
    );

    let data = await res.json();
    return data as OrderResponse;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    init(state) {
      state.status = "initial";
    },
  },
  extraReducers: {
    [sendOrder.pending.type](state) {
      state.status = "pending";
    },
    [sendOrder.rejected.type](state) {
      state.status = "failure";
    },
    [sendOrder.fulfilled.type](
      state,
      { payload }: PayloadAction<OrderResponse>
    ) {
      state.payload = payload;
      if (payload.status) {
        if (Array.isArray(payload.data)) state.status = "success";
        else state.status = "partial";
      } else state.status = "failure";
    },
  },
});

export default orderSlice.reducer;
export const { init } = orderSlice.actions;
