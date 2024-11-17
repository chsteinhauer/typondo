import { faFileLines, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { ReactNode } from "react";

import { InputEdit } from "../component.inputedit/_input-edit";
import { ItemType } from "../page.main/_main.interfaces";

import type { ITreeNode, TreeNodeContentProps } from "./_tree-view.interfaces";
import * as styles from "./_tree-view.styles";

export function TreeNodeContent(props: TreeNodeContentProps) {
  const renderIcon = (node: ITreeNode): ReactNode => {
    switch (node.item.type) {
      case ItemType.FOLDER:
        return <FontAwesomeIcon icon={faFolder} />;
      case ItemType.FILE:
        return <FontAwesomeIcon icon={faFileLines} />;
      default:
        break;
    }
  };

  return (
    <button
      className={cx(
        styles.tree_node_button,
        props.node.id === props.selectedId ? "selected" : "",
        props.node.id === props.editableId ? "editable" : "",
        styles.tree_node_title_indentation,
      )}
      // @ts-expect-error poor typings
      style={{ "--depth": props.node.depth }}
      onClick={props.itemClickedHandler}
    >
      <div className={styles.tree_node_title}>
        <span className={styles.tree_node_icon}>{renderIcon(props.node)}</span>
        <div className={styles.title}>
          <InputEdit
            key={props.node.id}
            value={props.node.name}
            editMode={props.editableId === props.node.id}
            onSave={(value: string) =>
              props.onSaveHandler(value, props.node.item)
            }
          />
        </div>
      </div>
    </button>
  );
}
