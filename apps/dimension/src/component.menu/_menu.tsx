import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "./_menu.style";
import { MenuItem, items } from "./_menu.static";
import { useState } from "react";

export function Menu() {
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>();
  let focus: MenuItem | undefined = undefined;

  function generateMenuItems() {
    return (
      <div className={styles.menu}>
        {items.map((item) => (
          <button
            key={item.key}
            className={styles.item}
            onClick={() => {
              focus = item;

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
