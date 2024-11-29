// eslint-disable-next-line import-x/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  addContentLayerLogic,
  addItemToContentLayerLogic,
  Position,
  removeItemFromContentLayerLogic,
  setItemAsOpenInContentLayerLogic,
} from "./_layer-logic";
import type { Item, LayoutLayer } from "./_main.interfaces";

export type LayerState = {
  root: LayoutLayer;
  selected: Item | undefined;
  focus: Item | undefined;
};

const initialState: LayerState = {
  root: {
    id: "root",
    direction: "row",
    children: [],
    sort: 0,
  },
  selected: undefined,
  focus: undefined,
};

export const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Item | undefined>) => {
      state.selected = action.payload;
    },
    setFocus: (state, action: PayloadAction<Item | undefined>) => {
      state.focus = action.payload;
    },
    addInitContentLayer: (state, action: PayloadAction<Item>) => {
      state.root = addContentLayerLogic(
        state.root,
        "root",
        action.payload,
        Position.LEFT,
      );
    },
    addContentLayer: (
      state,
      action: PayloadAction<{
        parentId: string;
        item: Item;
        position: Position;
      }>,
    ) => {
      const { parentId, item, position } = action.payload;

      addContentLayerLogic(state.root, parentId, item, position);
    },

    addItemToContentLayer: (
      state,
      action: PayloadAction<{
        itemSiblingId: string;
        item: Item;
      }>,
    ) => {
      const { itemSiblingId, item } = action.payload;

      addItemToContentLayerLogic(state.root, itemSiblingId, item);
    },

    removeItemFromContentLayer: (state, action: PayloadAction<Item>) => {
      const item = action.payload;

      const focus = removeItemFromContentLayerLogic(
        state.root,
        item,
        state.focus,
      );

      state.selected = focus;
      state.focus = focus;
    },

    setItemAsOpenInContentLayer: (state, action: PayloadAction<Item>) => {
      setItemAsOpenInContentLayerLogic(state.root, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addInitContentLayer,
  addContentLayer,
  addItemToContentLayer,
  removeItemFromContentLayer,
  setItemAsOpenInContentLayer,
  setFocus,
  setSelected,
} = layerSlice.actions;

export const layerReducer = layerSlice.reducer;
