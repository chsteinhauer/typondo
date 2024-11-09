import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";

import type { MenuLinkProps } from "./_menu.interfaces";
import * as styles from "./_menu.style";

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
