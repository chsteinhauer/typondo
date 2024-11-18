import type { ReactNode } from "react";

import type { Item } from "../page.main/_main.interfaces";

export type TabWrapperProps = {
  children: ReactNode | ReactNode[];
};

export type TabProps = {
  item: Item;
  open: boolean;
  closeTabClickedHandler: (item: Item) => void;
  itemClickedHandler: (item: Item) => void;
};
