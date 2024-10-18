import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Explorer } from "./_explorer";
import {
  faMagnifyingGlass,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

export type MenuItem = {
  key: string;
  icon: IconProp;
  focus: Boolean;
  panel?: JSX.Element;
};

export const items: MenuItem[] = [
  {
    key: "Explorer",
    icon: faFile,
    focus: false,
    panel: <Explorer />,
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
