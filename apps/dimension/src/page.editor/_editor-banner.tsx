import { faChevronRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import { useEffect, useState } from "react";

import type { EditorBannerProps } from "./_editor.interfaces";
import * as styles from "./_editor.styles";

export function EditorBanner(props: EditorBannerProps) {
  const [isSaving, setIsSaving] = useState(props.isSaving);
  const { path } = props.item;

  useEffect(() => setIsSaving(props.isSaving), [props.isSaving]);

  return (
    <div className={styles.editor_banner_wrapper}>
      <div className={styles.editor_banner}>
        {path.map((p) => {
          return (
            <span className={styles.editor_banner_path_entry} key={p}>
              {p}
              {p === props.item.item.title ? (
                ""
              ) : (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </span>
          );
        })}

        <span
          className={cx(styles.editor_banner_saving, isSaving ? "saving" : "")}
        >
          <FontAwesomeIcon icon={faRotate} />
          <span>Saving...</span>
        </span>
      </div>
    </div>
  );
}
