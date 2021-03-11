import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShopData = createAsyncThunk(
  "fetchShopData",
  async function (slug: string) {
    const response = await fetch(
      `https://manifest-salesapi.herokuapp.com/shops/${slug}`
    );

    return await response.json();
  }
);

let initialState = {
  loading: true,
  shop: null as Shop | null,
  error: false,
};

const shopSlice = createSlice({
  name: "shopslice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShopData.fulfilled.type](state, action) {
      state.loading = false;
      state.shop = action.payload;
    },
    [fetchShopData.rejected.type](state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default shopSlice.reducer;
