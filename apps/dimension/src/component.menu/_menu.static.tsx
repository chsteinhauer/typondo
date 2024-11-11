import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderTree,
  faGear,
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

import type { UserWithRelations } from "../api/requests";
import { Explorer } from "../component.explorer/_explorer";
import type { Item } from "../page.main/_main.interfaces";

import type { MenuItem } from "./_menu.interfaces";

export const menuItems: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFolderTree,
    panel: (props: {
      user: UserWithRelations;
      items: Item[];
      itemClickedHandler: (item?: Item) => void;
      createItemHandler: (item: Item) => Promise<void>;
      selectedId?: string;
    }) => (
      <Explorer
        user={props.user}
        items={props.items}
        itemClickedHandler={props.itemClickedHandler}
        createItemHandler={props.createItemHandler}
        selectedId={props.selectedId}
      />
    ),
  },
  {
    key: "Search",
    icon: faMagnifyingGlass,
  },
  {
    key: "Random",
    icon: faNetworkWired,
  },
];

export const settingsItem: MenuItem = {
  key: "Settings",
  icon: faGear,
};
