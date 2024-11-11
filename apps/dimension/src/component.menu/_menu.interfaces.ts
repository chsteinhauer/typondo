import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";

import type { UserWithRelations } from "../api/requests";
import type { Item } from "../page.main/_main.interfaces";

export type MenuProps = {
  user: UserWithRelations;
  items: Item[];
  itemClickedHandler: (item?: Item) => void;
  createItemHandler: (item: Item) => Promise<void>;
  selectedId?: string;
};

export type MenuItem = {
  key: string;
  icon: IconProp;
  selected?: boolean;
  panel?: (props: Record<string, unknown>) => ReactNode;
};
export type MenuLinkProps = {
  item: MenuItem;
  menuLinkClickedHandler: (item: MenuItem) => void;
};
