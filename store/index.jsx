import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./bank-slice";
import categoryReducer from "./category-slice";
import transactionReducer from "./transaction-slice";

const store = configureStore({
  reducer: {
    bank: bankReducer,
    category: categoryReducer,
    transaction: transactionReducer,
  },
});

export default store;
