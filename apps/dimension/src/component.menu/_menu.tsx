import type { File } from "@prisma/client";
import { useState } from "react";

import type { UserWithRelations } from "../api/requests";

import { MenuLink } from "./_menu-item";
import type { MenuItem } from "./_menu.static";
import { menuItems } from "./_menu.static";
import * as styles from "./_menu.style";

export type MenuProps = {
  user: UserWithRelations | null;
  fileClickedHandler: (file: File) => void;
  selectedId?: string;
};

export function Menu(props: MenuProps) {
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>();

  const menuLinkClickedHandler = (item: MenuItem) => {
    setMenuItem((prev: MenuItem) => {
      if (prev) prev.selected = false;
      if (prev?.key != item.key) item.selected = true;
      return prev?.key === item.key ? undefined : item;
    });
  };

  return (
    <div className={styles.menu_wrapper}>
      {
        <div className={styles.menu}>
          {menuItems.map((item: MenuItem) => (
            <MenuLink
              key={item.key}
              item={item}
              menuLinkClickedHandler={menuLinkClickedHandler}
            />
          ))}
        </div>
      }
      {menuItem && (
        <div
          className={styles.panel}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {menuItem.panel?.({
            user: props.user,
            fileClickedHandler: props.fileClickedHandler,
            selectedId: props.selectedId,
          })}
        </div>
      )}
    </div>
  );
}
