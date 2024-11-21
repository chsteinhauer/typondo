import type { ReactNode } from "react";

import type {
  ContentLayer,
  Item,
  LayoutLayer,
} from "../page.main/_main.interfaces";

export type Handlers = {
  tabClickedHandler: (item: Item) => void;
  closeTabClickedHandler: (layer: ContentLayer, item: Item) => void;
};

export type States = {
  selectedItem?: Item;
};

export type WindowProps = {
  layer: ContentLayer;
  handlers: Handlers;
  states: States;
};

export type WindowWrapperProps = {
  layer: LayoutLayer;
  handlers: Handlers;
  states: States;
};

export type WindowDropzoneProps = {
  item?: Item;
  children: ReactNode | ReactNode[];
};
