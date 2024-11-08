import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import type { File } from "@prisma/client";

import type { UserWithRelations } from "../api/requests";

import { Explorer } from "./d_explorer";

export type MenuItem = {
  key: string;
  icon: IconProp;
  selected: boolean;
  panel?: any;
};

export const items: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    selected: false,
    panel: (
      user: UserWithRelations,
      fileClickedHandler: (file: File) => File,
    ) => <Explorer user={user} fileClickedHandler={fileClickedHandler} />,
  },
  {
    key: "Search",
    icon: faMagnifyingGlass,
    selected: false,
  },
  {
    key: "Random",
    icon: faNetworkWired,
    selected: false,
  },
];
