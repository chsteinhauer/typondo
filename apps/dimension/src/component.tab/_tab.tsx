import { faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { File } from "@prisma/client";

import * as styles from "./_tab.style";

type TabProps = {
  file: File;
  selected: boolean;
  closeTabClickedHandler: (file: File) => void;
  fileClickedHandler: (file: File) => void;
};

export function Tab(props: TabProps) {
  const closeTabClickedHandler = () => {
    props.closeTabClickedHandler(props.file);
  };

  const fileClickedHandler = () => {
    props.fileClickedHandler(props.file);
  };

  return (
    <div className={styles.tab}>
      <button
        className={cx(
          styles.tab_card,
          props.selected ? styles.tab_selected : "",
        )}
        onClick={fileClickedHandler}
      >
        <FontAwesomeIcon className={styles.tab_icon} icon={faFileLines} />
        <span className={styles.tab_text}>{props.file.title}</span>
      </button>

      <button className={styles.tab_button} onClick={closeTabClickedHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
