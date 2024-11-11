import {
  faChevronDown,
  faChevronUp,
  faFileLines,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

import { InputEdit } from "../component.inputedit/_input-edit";
import type { Item } from "../page.main/_main.interfaces";
import { ItemType } from "../page.main/_main.interfaces";

import type {
  TreeNodeProps,
  TreeNode,
  TreeViewProps,
} from "./_explorer.interfaces";
import * as styles from "./_explorer.styles";

const TreeNode = (props: TreeNodeProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    props.selectedId,
  );
  const [editableId, setEditableId] = useState<string | undefined>(
    props.editableId,
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);

  useEffect(() => setSelectedId(props.selectedId), [props.selectedId]);
  useEffect(() => setEditableId(props.editableId), [props.editableId]);

  const renderIcon = (node: TreeNode): ReactNode => {
    switch (node.item.type) {
      case ItemType.FOLDER:
        return <FontAwesomeIcon icon={faFolder} />;
      case ItemType.FILE:
        return <FontAwesomeIcon icon={faFileLines} />;
      default:
        break;
    }
  };

  const itemClickedHandler = (e) => {
    e.stopPropagation();

    props.itemClickedHandler(props.node.item);
  };

  // const saveAsHandler = async (value: string) => {
  //   if (!selectedId) return;

  //   if (selectedItem.type === "folder") {
  //     const item = selectedItem.item;

  //     item.title = value;
  //     await updateFolder(item as Folder);
  //   } else {
  //     const item = selectedItem.item;

  //     item.title = value;
  //     await updateFile(item as File);
  //   }

  //   setEditableItemId(undefined);
  // };

  return (
    <li
      className={cx(
        styles.explorer_tree_node,
        props.node.id === selectedId ? "selected" : "",
        props.node.id === editableId ? "editable" : "",
      )}
    >
      {props.node.item.type === ItemType.FOLDER && (
        <button onClick={toggleNode} className={styles.explorer_toggle_icon}>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      )}

      <button
        className={styles.explorer_tree_node_button}
        onClick={itemClickedHandler}
      >
        <span className={styles.explorer_tree_node_icon}>
          {renderIcon(props.node)}
        </span>
        <div className={styles.explorer_title}>
          {/* {props.node.name} */}
          <InputEdit
            key={props.node.id}
            value={props.node.name}
            editMode={editableId === props.node.id}
            onSave={(value: string) =>
              props.onSaveHandler(value, props.node.item)
            }
          />
        </div>
        {isOpen && (
          <TreeView
            data={props.node.children ?? []}
            selectedId={selectedId}
            editableId={editableId}
            itemClickedHandler={props.itemClickedHandler}
            onSaveHandler={props.onSaveHandler}
          />
        )}
      </button>
    </li>
  );
};

const TreeView = (props: TreeViewProps) => {
  return (
    <ul className={styles.explorer_tree_view}>
      {props.data?.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedId={props.selectedId}
          editableId={props.editableId}
          itemClickedHandler={props.itemClickedHandler}
          onSaveHandler={props.onSaveHandler}
        />
      ))}
    </ul>
  );
};

export default TreeView;
