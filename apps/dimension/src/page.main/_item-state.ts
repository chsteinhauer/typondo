// eslint-disable-next-line import-x/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Item } from "./_main.interfaces";

export type ItemState = {
  selected?: Item;
  focus?: Item;
};

const initialState: ItemState = {
  selected: undefined,
  focus: undefined,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Item | undefined>) => {
      state.selected = action.payload;
    },
    setFocus: (state, action: PayloadAction<Item | undefined>) => {
      state.focus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFocus, setSelected } = itemSlice.actions;

export const itemReducer = itemSlice.reducer;
