import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../lib/constants";

const GET_CURRENCY = "currency/getCurrency";
const GET_RATES = "currency/getEchangeRates";

export const getCurrency = createAsyncThunk(
  GET_CURRENCY,
  async (amount: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/convert?access_key=${API_KEY}`,
        {
          params: {
            from: "USD",
            to: "EUR",
            amount,
          },
        }
      );
      return response.data || {};
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getExchangeRates = createAsyncThunk(
  GET_RATES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/latest?access_key=${API_KEY}`
      );
      return response.data || {};
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
