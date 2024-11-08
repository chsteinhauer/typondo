import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { File } from "@prisma/client";

import type { MenuItem } from "./_menu.static";
import * as styles from "./_menu.style";

export type MenuLinkProps = {
  item: MenuItem;
  menuLinkClickedHandler: (file: File) => void;
};

export function MenuLink(props: MenuLinkProps) {
  const { item } = props;

  const menuLinkClickedHandler = () => {
    props.menuLinkClickedHandler(item);
  };

  return (
    <button
      key={item.key}
      className={cx(styles.item, item.selected && styles.selected_item)}
      onClick={menuLinkClickedHandler}
    >
      <FontAwesomeIcon className={styles.icon} icon={item.icon} />
    </button>
  );
}
