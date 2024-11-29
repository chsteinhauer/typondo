import { faFileLines, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputEdit } from "../component.inputedit/_input-edit";
import {
  addInitContentLayer,
  addItemToContentLayer,
  setFocus,
  setSelected,
} from "../page.main/_layer-state";
import { ItemType } from "../page.main/_main.interfaces";
import type { RootState } from "../store";

import type { ITreeNode, TreeNodeContentProps } from "./_tree-view.interfaces";
import * as styles from "./_tree-view.styles";

export function TreeNodeContent(props: TreeNodeContentProps) {
  const selected = useSelector((state: RootState) => state.layer.selected);
  const focus = useSelector((state: RootState) => state.layer.focus);
  const dispatch = useDispatch();

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

  const treeNodeButtonClickedHandler = () => {
    const item = props.node.item;

    dispatch(setSelected(item));

    if (item.type === ItemType.FILE) {
      if (focus) {
        // when selecting file from explorer, open file in same layer as the
        // current focus item
        dispatch(addItemToContentLayer({ itemSiblingId: focus.id, item }));
      } else {
        // if focus is undefined, it is assumed that there is no content layer
        // yet
        dispatch(addInitContentLayer(item));
      }
      dispatch(setFocus(props.node.item));
    }
  };

  return (
    <button
      className={cx(
        styles.tree_node_button,
        props.node.id === selected?.id ? "selected" : "",
        props.node.id === props.editableId ? "editable" : "",
        styles.tree_node_title_indentation,
      )}
      // @ts-expect-error poor typings
      style={{ "--depth": props.node.depth }}
      onClick={treeNodeButtonClickedHandler}
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
