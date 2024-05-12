import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCurrency, getExchangeRates } from "../thunks/currencyThunks";

interface CurrencyExchangeState {
  convertedAmount: number;
  loading: boolean;
  error: string | null;
  exchangeRates: any;
}

const initialState: CurrencyExchangeState = {
  convertedAmount: 0,
  exchangeRates: [],
  loading: false,
  error: null,
};

const currencyExchangeSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrency.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.convertedAmount = action.payload.result.toFixed(2);
      })
      .addCase(getCurrency.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error.info || "An error occurred";
      });

    builder
      .addCase(getExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getExchangeRates.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.exchangeRates = Object.entries(action.payload.rates);
        }
      )
      .addCase(
        getExchangeRates.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.error.info || "An error occurred";
        }
      );
  },
});

export default currencyExchangeSlice.reducer;
