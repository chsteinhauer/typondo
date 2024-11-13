import { cx } from "@linaria/core";

import * as styles from "./_editor.styles";

export function EditorToolbarButton(props) {
  return (
    <button
      {...props}
      className={cx(
        styles.editor_toolbar_button,
        props.editor?.isActive(props.value) ? "selected" : "",
      )}
    >
      {props.children}
    </button>
  );
}
