import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import React from "react";

import type { TreeNodeToggleButtonProps } from "./_tree-view.interfaces";
import * as styles from "./_tree-view.styles";

export function TreeNodeToggleButton(props: TreeNodeToggleButtonProps) {
  return (
    <>
      <div
        className={styles.tree_node_indentation_line}
        // @ts-expect-error poor typings
        style={{ "--depth": props.node.depth }}
      />
      <button
        onClick={props.toggleButtonHandler}
        className={cx(
          styles.toggle_icon,
          styles.tree_node_toggle_icon_indentation,
        )}
        // @ts-expect-error poor typings
        style={{ "--depth": props.node.depth }}
      >
        {props.isOpen ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} />
        )}
      </button>
    </>
  );
}
