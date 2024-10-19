import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import type { MenuItem } from "./_menu.static";
import { items } from "./_menu.static";
import * as styles from "./_menu.style";

export function Menu() {
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>();

  function generateMenuItems() {
    return (
      <div className={styles.menu}>
        {items.map((item) => (
          <button
            key={item.key}
            className={styles.item}
            onClick={() => {
              setMenuItem((prev) =>
                prev?.key === item.key ? undefined : item,
              );
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
      {menuItem && <div className={styles.panel}>{menuItem.panel}</div>}
    </div>
  );
}
