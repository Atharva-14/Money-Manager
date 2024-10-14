const { createSlice } = require("@reduxjs/toolkit");
import { getTransactions } from "./async-thunk";

const initialState = {
  transactionList: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Handling fetch transactions
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionList = action.payload.sortedTransactions;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const transactionsAction = transactionSlice.actions;

export default transactionSlice.reducer;
