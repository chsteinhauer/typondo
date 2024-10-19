import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import type { Folder, File } from "@prisma/client";

import { Explorer } from "./_explorer";

export type MenuItem = {
  key: string;
  icon: IconProp;
  focus: boolean;
  panel?: any;
};

export const items: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    focus: false,
    panel: (folders: Folder[], files: File[]) => (
      <Explorer files={files} folders={folders} />
    ),
  },
  {
    key: "Search",
    icon: faMagnifyingGlass,
    focus: false,
  },
  {
    key: "Random",
    icon: faNetworkWired,
    focus: false,
  },
];
