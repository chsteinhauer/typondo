import type { UserWithRelations } from "../api/requests";
import type { Item } from "../page.main/_main.interfaces";

export type ExplorerProps = {
  user: UserWithRelations;
  items: Item[];
  itemClickedHandler: (item?: Item) => void;
  createItemHandler: (item: Item) => Promise<void>;
  selectedId?: string;
};

export type TreeViewProps = {
  data: TreeNode[];
  itemClickedHandler: (item?: Item) => void;
  onSaveHandler: (value: string, item: Item) => void;
  openNodePath: () => void;
  selectedId?: string;
  editableId?: string;
};

export type TreeNode = {
  id: string;
  name: string;
  item: Item;
  depth: number;
  isOpen: boolean;
  children?: TreeNode[];
};

export type TreeNodeProps = {
  node: TreeNode;
  itemClickedHandler: (item?: Item) => void;
  onSaveHandler: (value: string, item: Item) => void;
  openNodePath: () => void;
  selectedId?: string;
  editableId?: string;
};
