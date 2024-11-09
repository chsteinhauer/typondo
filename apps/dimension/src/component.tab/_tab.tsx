import { faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";

import type { TabProps } from "./_tab.interfaces";
import * as styles from "./_tab.style";

export function Tab(props: TabProps) {
  const closeTabClickedHandler = () => {
    props.closeTabClickedHandler(props.item);
  };

  const itemClickedHandler = () => {
    props.itemClickedHandler(props.item);
  };

  return (
    <div className={styles.tab}>
      <button
        className={cx(
          styles.tab_card,
          props.selected ? styles.tab_selected : "",
        )}
        onClick={itemClickedHandler}
      >
        <FontAwesomeIcon className={styles.tab_icon} icon={faFileLines} />
        <span className={styles.tab_text}>{props.item.item.title}</span>
      </button>

      <button className={styles.tab_button} onClick={closeTabClickedHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
