import type { Folder, File } from "@prisma/client";

import type { UserWithRelations } from "../api/requests";

export enum ItemType {
  FOLDER,
  FILE,
}

export type Item = {
  id: string;
  item: File | Folder;
  path: string[];
  type: ItemType;
};

export type ContentLayer = {
  id: string;
  items: Item[];
  open: Item;
  sort: number;
  parent: LayoutLayer;
};

export type LayoutLayer = {
  id: string;
  direction: "row" | "column";
  children: Layer[];
  sort: number;
  parent?: LayoutLayer;
};

export type Layer = ContentLayer | LayoutLayer;

export type MainProps = {
  user: UserWithRelations;
};
