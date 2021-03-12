import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  hasContact: false,
  hasSocial: false,
  currency: "NGN",
};

const shopSlice = createSlice({
  name: "shopslice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShopData.fulfilled.type](state, { payload }: PayloadAction<Shop>) {
      state.loading = false;
      state.shop = payload;
      if (payload.data) {
        const { email, phoneNumber, whatsapp } = payload.data.contact;
        const { facebook, instagram, twitter } = payload.data.socialMedia;

        state.hasContact = Boolean(email || phoneNumber || whatsapp);
        state.hasSocial = Boolean(facebook || instagram || twitter);

        state.currency = payload.data.storeCurrency;
      }
    },
    [fetchShopData.rejected.type](state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default shopSlice.reducer;
