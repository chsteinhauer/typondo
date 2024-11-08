import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import type { File } from "@prisma/client";
import type { ReactNode } from "react";

import type { UserWithRelations } from "../api/requests";
import { Explorer } from "../component.explorer/_explorer";

export type MenuItem = {
  key: string;
  icon: IconProp;
  selected: boolean;
  panel?: (props) => ReactNode;
};

export const menuItems: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    selected: false,
    panel: (props: {
      user: UserWithRelations;
      fileClickedHandler: (file: File) => File;
      selectedId?: string;
    }) => (
      <Explorer
        user={props.user}
        fileClickedHandler={props.fileClickedHandler}
        selectedId={props.selectedId}
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

export const settingsItem: MenuItem = {
  key: "Settings",
  icon: faGear,
  selected: false,
};
