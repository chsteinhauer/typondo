import {
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faFileLines,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

import { InputEdit } from "../component.inputedit/_input-edit";
import { ItemType } from "../page.main/_main.interfaces";

import type {
  TreeNodeProps,
  TreeNode,
  TreeViewProps,
} from "./_explorer.interfaces";
import * as styles from "./_explorer.styles";

const TreeNode = (props: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(props.node.isOpen);
  const toggleNode = (e) => {
    e.stopPropagation();

    setIsOpen(!isOpen);
  };

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

    if (props.node.item.type === ItemType.FOLDER) {
      toggleNode(e);
    }
  };

  useEffect(() => {
    const traverseTree = (node: TreeNode): boolean => {
      if (node.id === props.selectedId) return true;
      else {
        const isChildSelected = !!node.children?.find((n) => traverseTree(n));
        if (isChildSelected) setIsOpen(true);

        return isChildSelected;
      }
    };

    if (!isOpen && props.node.children?.find((n) => traverseTree(n))) {
      setIsOpen(true);
    }
  }, [props.node.children, isOpen, props.selectedId]);

  return (
    <li className={styles.explorer_tree_node}>
      {props.node.item.type === ItemType.FOLDER && (
        <>
          <div
            className={styles.tree_node_indentation_line}
            // @ts-expect-error poor typings
            style={{ "--depth": props.node.depth }}
          />
          <button
            onClick={toggleNode}
            className={cx(
              styles.explorer_toggle_icon,
              styles.tree_node_toggle_icon_indentation,
            )}
            // @ts-expect-error poor typings
            style={{ "--depth": props.node.depth }}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </button>
        </>
      )}

      <button
        className={cx(
          styles.explorer_tree_node_button,
          props.node.id === props.selectedId ? "selected" : "",
          props.node.id === props.editableId ? "editable" : "",
          styles.tree_node_title_indentation,
        )}
        // @ts-expect-error poor typings
        style={{ "--depth": props.node.depth }}
        onClick={itemClickedHandler}
      >
        <div className={styles.explorer_tree_node_title}>
          <span className={styles.explorer_tree_node_icon}>
            {renderIcon(props.node)}
          </span>
          <div className={styles.explorer_title}>
            {/* {props.node.name} */}
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

      {isOpen && (
        <TreeView
          data={props.node.children ?? []}
          selectedId={props.selectedId}
          editableId={props.editableId}
          itemClickedHandler={props.itemClickedHandler}
          onSaveHandler={props.onSaveHandler}
        />
      )}
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
