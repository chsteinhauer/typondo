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
  selected: boolean;
  panel?: any;
};

export const items: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    selected: false,
    panel: (
      folders: Folder[],
      files: File[],
      fileClickedHandler: (file: File) => File,
    ) => (
      <Explorer
        files={files}
        folders={folders}
        fileClickedHandler={fileClickedHandler}
      />
    ),
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
