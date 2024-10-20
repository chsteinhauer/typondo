import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, User, File } from "@prisma/client";
import { useState } from "react";

import type { MenuItem } from "./_menu.static";
import { items } from "./_menu.static";
import * as styles from "./_menu.style";

export type MenuProps = {
  user: User | null;
  folders: Folder[];
  files: File[];
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
        <div className={styles.panel}>
          {menuItem.panel?.(
            props.folders,
            props.files,
            props.fileClickedHandler,
          )}
        </div>
      )}
    </div>
  );
}
