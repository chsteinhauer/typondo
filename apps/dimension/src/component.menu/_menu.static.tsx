import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

import { Explorer } from "../component.explorer/_explorer";
import type { Item } from "../page.main/_main.interfaces";

import type { MenuItem } from "./_menu.interfaces";

export const menuItems: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    panel: (props: {
      items: Item[];
      itemClickedHandler: (item: Item) => void;
      selectedId?: string;
    }) => (
      <Explorer
        items={props.items}
        itemClickedHandler={props.itemClickedHandler}
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
