import type { Item } from "../page.main/_main.interfaces";

export type TreeViewProps = {
  data: ITreeNode[];
  itemClickedHandler: (item?: Item) => void;
  onSaveHandler: (value: string, item: Item) => void;
  selectedId?: string;
  editableId?: string;
};

export type ITreeNode = {
  id: string;
  name: string;
  item: Item;
  depth: number;
  isOpen: boolean;
  children?: ITreeNode[];
};

export type TreeNodeProps = {
  node: ITreeNode;
  itemClickedHandler: (item?: Item) => void;
  onSaveHandler: (value: string, item: Item) => void;
  selectedId?: string;
  editableId?: string;
};

export type TreeNodeContentProps = {
  node: ITreeNode;
  toggleButtonHandler: (e) => void;
  onSaveHandler: (value: string, item: Item) => void;
  selectedId?: string;
  editableId?: string;
};

export type TreeNodeToggleButtonProps = {
  node: ITreeNode;
  isOpen: boolean;
  toggleButtonHandler: (e) => void;
};
