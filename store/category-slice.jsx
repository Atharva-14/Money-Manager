const { createSlice } = require("@reduxjs/toolkit");
import { getCategory } from "./async-thunk";

const initialState = {
  expenseList: [],
  incomeList: [],
  loading: false,
  error: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList = action.payload.expenseCategories;
        state.incomeList = action.payload.incomeCategories;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
