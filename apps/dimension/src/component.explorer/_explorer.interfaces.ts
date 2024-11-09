import type { Item } from "../page.main/_main.interfaces";

export type ExplorerProps = {
  items: Item[];
  itemClickedHandler: (item: Item) => void;
  selectedId?: string;
};

export type TreeViewProps = {
  data: TreeNode[];
  itemClickedHandler: (item: Item) => void;
  selectedId?: string;
};

export type TreeNode = {
  id: string;
  name: string;
  item: Item;
  children?: TreeNode[];
};

export type TreeNodeProps = {
  node: TreeNode;
  itemClickedHandler: (item: Item) => void;
  selectedId?: string;
};
