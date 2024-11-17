import React, { useEffect, useState } from "react";

import { Draggable } from "../component.dnd/_draggable";
import { ItemType } from "../page.main/_main.interfaces";

import { TreeNodeContent } from "./_tree-node-content";
import { TreeNodeToggleButton } from "./_tree-node-toggle-button";
import TreeView from "./_tree-view";
import type { ITreeNode, TreeNodeProps } from "./_tree-view.interfaces";
import * as styles from "./_tree-view.styles";

export function TreeNode(props: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = (e) => {
    e.stopPropagation();

    setIsOpen(!isOpen);
  };

  const itemClickedHandler = (e) => {
    e.stopPropagation();
    props.itemClickedHandler(props.node.item);

    if (props.node.item.type === ItemType.FOLDER) {
      toggleNode(e);
    }
  };

  const onDragOverHandler = () => {
    console.log("DRAG");

    setIsOpen(true);
  };

  useEffect(() => {
    const traverseTree = (node: ITreeNode): boolean => {
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
    <li className={styles.tree_node}>
      {props.node.item.type === ItemType.FOLDER && (
        <div onDragOver={onDragOverHandler}>
          <TreeNodeToggleButton
            key={"toggle-button-" + props.node.id}
            toggleButtonHandler={toggleNode}
            isOpen={isOpen}
            node={props.node}
          />

          <TreeNodeContent
            key={"content-" + props.node.id}
            node={props.node}
            selectedId={props.selectedId}
            editableId={props.editableId}
            itemClickedHandler={itemClickedHandler}
            onSaveHandler={props.onSaveHandler}
          />
        </div>
      )}

      {props.node.item.type === ItemType.FILE && (
        <Draggable key={props.node.id} id={props.node.id}>
          <TreeNodeContent
            key={"content-" + props.node.id}
            node={props.node}
            selectedId={props.selectedId}
            editableId={props.editableId}
            itemClickedHandler={itemClickedHandler}
            onSaveHandler={props.onSaveHandler}
          />
        </Draggable>
      )}

      {isOpen && (
        <TreeView
          key={"list-" + props.node.id}
          data={props.node.children ?? []}
          selectedId={props.selectedId}
          editableId={props.editableId}
          itemClickedHandler={props.itemClickedHandler}
          onSaveHandler={props.onSaveHandler}
        />
      )}
    </li>
  );
}
