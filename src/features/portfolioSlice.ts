import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Asset {
  id: string;
  name: string;
  quantity: number;
  currentPrice: number;     
  totalValue: number;       
  change24h: number;        
  portfolioShare: number;   
}

interface PortfolioState {
  assets: Asset[];
  totalPortfolioValue: number;
}

const initialState: PortfolioState = {
  assets: [],
  totalPortfolioValue: 0,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
      state.totalPortfolioValue = calcTotal(state.assets);
      recalcShares(state);
      saveToLocalStorage(state.assets);
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
      state.totalPortfolioValue = calcTotal(state.assets);
      recalcShares(state);
      saveToLocalStorage(state.assets);
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
      state.totalPortfolioValue = calcTotal(state.assets);
      recalcShares(state);
      saveToLocalStorage(state.assets);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
      state.totalPortfolioValue = calcTotal(state.assets);
      recalcShares(state);
      saveToLocalStorage(state.assets);
    },
  },
});

function calcTotal(assets: Asset[]) {
  return assets.reduce((acc, item) => acc + item.totalValue, 0);
}

function recalcShares(state: PortfolioState) {
  state.assets.forEach((asset) => {
    asset.portfolioShare =
      state.totalPortfolioValue > 0
        ? (asset.totalValue / state.totalPortfolioValue) * 100
        : 0;
  });
}

function saveToLocalStorage(assets: Asset[]) {
  localStorage.setItem('assets', JSON.stringify(assets));
}

export const { setAssets, addAsset, updateAsset, removeAsset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
