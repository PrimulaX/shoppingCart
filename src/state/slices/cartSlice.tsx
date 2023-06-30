import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { IProductData } from '../../types';

interface CartItem extends IProductData {
  quantity: number;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    add: (state, action: PayloadAction<IProductData>) => {
      const { id } = action.payload;
      const existingItem = state.find(item => item.id === id);

      if (existingItem) existingItem.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    remove: (state, action: PayloadAction<IProductData>) => {
      const { id } = action.payload;
      const existingItem = state.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          const index = state.findIndex(item => item.id === id);
          state.splice(index, 1);
        } else existingItem.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<IProductData>) => {
      const { id } = action.payload;
      const index = state.findIndex(item => item.id === id);
      state.splice(index, 1);
    },
  },
});

export const { add, remove, removeItem } = cartSlice.actions;

export default cartSlice.reducer