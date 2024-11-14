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

export type MainProps = {
  user: UserWithRelations;
};
