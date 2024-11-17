import React from "react";

import { Draggable } from "../component.dnd/draggable";
import { Droppable } from "../component.dnd/droppable";
import type { TreeViewProps } from "../component.explorer/_explorer.interfaces";
import { ItemType } from "../page.main/_main.interfaces";

import { TreeNode } from "./_tree-node";
import * as styles from "./_tree-view.styles";

export function TreeView(props: TreeViewProps) {
  return (
    <ul className={styles.tree_view}>
      {props.data?.map((node) => (
        <>
          {node.item.type === ItemType.FOLDER && (
            <Droppable key={node.id} id={node.id}>
              <TreeNode
                key={node.id}
                node={node}
                selectedId={props.selectedId}
                editableId={props.editableId}
                itemClickedHandler={props.itemClickedHandler}
                onSaveHandler={props.onSaveHandler}
              />
            </Droppable>
          )}

          {node.item.type === ItemType.FILE && (
            <TreeNode
              key={node.id}
              node={node}
              selectedId={props.selectedId}
              editableId={props.editableId}
              itemClickedHandler={props.itemClickedHandler}
              onSaveHandler={props.onSaveHandler}
            />
          )}
        </>
      ))}
    </ul>
  );
}

export default TreeView;
