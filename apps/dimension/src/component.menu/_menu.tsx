import { useState } from "react";

import { MenuLink } from "./_menu-link";
import type { MenuProps } from "./_menu.interfaces";
import type { MenuItem } from "./_menu.static";
import { menuItems, settingsItem } from "./_menu.static";
import * as styles from "./_menu.style";

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
          <div className={styles.menu_logo}>
            <img src="/logo-white.png" alt="" />
          </div>

          {menuItems.map((item: MenuItem) => (
            <MenuLink
              key={item.key}
              item={item}
              menuLinkClickedHandler={menuLinkClickedHandler}
            />
          ))}

          <div className={styles.menu_settings}>
            <MenuLink
              key={settingsItem.key}
              item={settingsItem}
              menuLinkClickedHandler={menuLinkClickedHandler}
            />
          </div>
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
            items: props.items,
            itemClickedHandler: props.itemClickedHandler,
            selectedId: props.selectedId,
          })}
        </div>
      )}
    </div>
  );
}
