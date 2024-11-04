import { faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { File } from "@prisma/client";

import * as styles from "./_tab.style";

type TabProps = {
  file: File;
  closeTabClickedHandler: (file: File) => void;
  fileClickedHandler: (file: File) => void;
};

export function Tab(props: TabProps) {
  const closeTabClickedHandler = () => {
    props.closeTabClickedHandler(props.file);
  };

  return (
    <div className={styles.tab_wrapper}>
      <FontAwesomeIcon className={styles.tab_icon} icon={faFileLines} />
      <span className={styles.tab_text}>{props.file.title}</span>
      <button className={styles.tab_button} onClick={closeTabClickedHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
