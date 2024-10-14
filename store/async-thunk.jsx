import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBanks = createAsyncThunk(
  "bank/getBanks",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/bank/`,
        {
          params: {
            token,
          },
        }
      );
      const bankArr = res.data.result;

      console.log("thunk bank", bankArr);

      return {
        bankArr,
      };
    } catch (error) {
      console.error("Failed to fetch banks");
      return rejectWithValue(error.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/transactions/`,
        {
          params: {
            token,
          },
        }
      );

      const transArr = res.data.result;

      const sortedTransactions = transArr.sort(
        (a, b) => new Date(b?.trasaction_date) - new Date(a?.transaction_date)
      );

      return {
        sortedTransactions,
      };
    } catch (error) {
      console.error("Failed to fetch transactions");
      return rejectWithValue(error.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://money-manager-backend-bsdc.onrender.com/api/categories/`,
        {
          params: {
            token,
          },
        }
      );

      const categories = res.data.result;

      const expenseCategories = categories.filter(
        (category) => category.type_of === "expense"
      );

      const incomeCategories = categories.filter(
        (category) => category.type_of === "income"
      );

      return {
        expenseCategories,
        incomeCategories,
      };
    } catch (error) {
      console.error("Failed to fetch category");
      return rejectWithValue(error.message);
    }
  }
);
