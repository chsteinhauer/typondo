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

import { InputEdit } from "../component.inputedit/_inputedit";
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);

  useEffect(() => setSelectedId(props.selectedId), [props.selectedId]);

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

  const itemClickedHandler = () => {
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
        props.node.id === props.selectedId ? "selected" : "",
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
        <span className={styles.explorer_title}>
          {props.node.name}
          {/* <InputEdit
            key={props.node.id}
            value={props.node.name}
            editMode={editableItemId === props.node.id}
            onSave={saveAsFunc}
          /> */}
        </span>
        {isOpen && (
          <TreeView
            data={props.node?.children}
            selectedId={selectedId}
            itemClickedHandler={props.itemClickedHandler}
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
          itemClickedHandler={props.itemClickedHandler}
        />
      ))}
    </ul>
  );
};

export default TreeView;
