import type { ReactNode } from "react";

import type {
  ContentLayer,
  Item,
  LayoutLayer,
} from "../page.main/_main.interfaces";

export type Handlers = {
  tabClickedHandler: (layer: ContentLayer, item: Item) => void;
  closeTabClickedHandler: (layer: ContentLayer, item: Item) => void;
};

export type WindowProps = {
  layer: ContentLayer;
  handlers: Handlers;
};

export type WindowWrapperProps = {
  layer: LayoutLayer;
  handlers: Handlers;
};
