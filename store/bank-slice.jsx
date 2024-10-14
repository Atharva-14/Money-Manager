const { createSlice } = require("@reduxjs/toolkit");
import { getBanks } from "./async-thunk";

const initialState = {
  bankList: [],
  is_success: false,
  loading: false,
  error: null,
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Handling fetch banks
    builder
      .addCase(getBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.bankList = action.payload.bankArr;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
   
  },
});

export const bankActions = bankSlice.actions;

export default bankSlice.reducer;
