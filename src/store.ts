import { AnyAction, configureStore, createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { restClient } from '@polygon.io/client-js';
import { loadState, saveState } from './localStorage';

// Define the type for our portfolios state: a record of portfolio names to an array of ticker symbols
type PortfoliosState = Record<string, string[]>;

const PERSIST_KEY = "myAppState";

const initialState: PortfoliosState = {};

const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addPortfolio: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      if (!state[name]) {
        state[name] = [];
      }
    },
    removePortfolio: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      delete state[name];
    },
    addTickerToPortfolio: (
      state,
      action: PayloadAction<{ portfolio: string; symbol: string }>
    ) => {
      const { portfolio, symbol } = action.payload;
      if (state[portfolio] && !state[portfolio].includes(symbol)) {
        state[portfolio].push(symbol);
      }
    },
    removeTickerFromPortfolio: (
      state,
      action: PayloadAction<{ portfolio: string; symbol: string }>
    ) => {
      const { portfolio, symbol } = action.payload;
      if (state[portfolio]) {
        state[portfolio] = state[portfolio].filter(s => s !== symbol);
      }
    },
  },
});

export const {
  addPortfolio,
  removePortfolio,
  addTickerToPortfolio,
  removeTickerFromPortfolio,
} = portfoliosSlice.actions;

const persistedPortfolios = loadState<PortfoliosState>(PERSIST_KEY) ?? {};

export const store = configureStore({
    reducer: {
      portfolios: portfoliosSlice.reducer,
    },
    preloadedState: {
      portfolios: persistedPortfolios,
    },
  });

store.subscribe(() => {
    saveState(PERSIST_KEY, store.getState().portfolios);
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
