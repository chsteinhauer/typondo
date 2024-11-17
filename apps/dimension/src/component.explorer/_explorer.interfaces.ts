import type { UserWithRelations } from "../api/requests";
import type { Item } from "../page.main/_main.interfaces";

export type ExplorerProps = {
  user: UserWithRelations;
  items: Item[];
  itemClickedHandler: (item?: Item) => void;
  createItemHandler: (item: Item) => Promise<void>;
  selectedId?: string;
};
