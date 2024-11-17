import React from "react";

import { Droppable } from "../component.dnd/droppable";
import { ItemType } from "../page.main/_main.interfaces";

import { TreeNode } from "./_tree-node";
import type { TreeViewProps } from "./_tree-view.interfaces";
import * as styles from "./_tree-view.styles";

export function TreeView(props: TreeViewProps) {
  return (
    <ul className={styles.tree_view}>
      {props.data?.map((node) => (
        <div key={"view-" + node.id}>
          {node.item.type === ItemType.FOLDER && (
            <Droppable key={node.id} id={node.id}>
              <TreeNode
                key={"folder-" + node.id}
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
              key={"file-" + node.id}
              node={node}
              selectedId={props.selectedId}
              editableId={props.editableId}
              itemClickedHandler={props.itemClickedHandler}
              onSaveHandler={props.onSaveHandler}
            />
          )}
        </div>
      ))}
    </ul>
  );
}

export default TreeView;
