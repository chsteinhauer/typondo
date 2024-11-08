import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { File } from "@prisma/client";
import { useState } from "react";

import type { UserWithRelations } from "../api/requests";

import type { MenuItem } from "./d_menu.static";
import { items } from "./d_menu.static";
import * as styles from "./d_menu.style";

export type MenuProps = {
  user: UserWithRelations | null;
  fileClickedHandler: (file: File) => void;
};

export function Menu(props: MenuProps) {
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>();

  function generateMenuItems() {
    return (
      <div className={styles.menu}>
        {items.map((item) => (
          <button
            key={item.key}
            className={cx(styles.item, item.selected && styles.selected_item)}
            onClick={() => {
              setMenuItem((prev) => {
                if (prev) prev.selected = false;
                if (prev?.key != item.key) item.selected = true;
                return prev?.key === item.key ? undefined : item;
              });
            }}
          >
            <FontAwesomeIcon className={styles.icon} icon={item.icon} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {generateMenuItems()}
      {menuItem && (
        <div
          className={styles.panel}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {menuItem.panel?.(props.user, props.fileClickedHandler)}
        </div>
      )}
    </div>
  );
}
