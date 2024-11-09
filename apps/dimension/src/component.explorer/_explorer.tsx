import type { Folder, File } from "@prisma/client";
import { useMemo, useState } from "react";

import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";
import type { Item } from "../page.main/_main.interfaces";
import { ItemType } from "../page.main/_main.interfaces";

import type { ExplorerProps, TreeNode } from "./_explorer.interfaces";
import * as styles from "./_explorer.styles";
import TreeView from "./_tree-view";

export function Explorer(props: ExplorerProps) {
  const { clicked, setClicked, coords, setCoords } = useContextMenu();

  const [items, setItems] = useState<Item[]>(props.items);

  const data = useMemo(() => {
    const genTreeData = (item: Item): TreeNode => {
      return {
        id: item.id,
        name: item.item.title,
        item: item,
        children: [
          ...items
            .filter((c) => c.item.folderId === item.id)
            .map((c) => genTreeData(c)),
        ],
      };
    };

    const root = items.filter((i) => !i.item.folderId);

    return [...root.map((i) => genTreeData(i))];
  }, [items]);

  console.log(data);

  return (
    <div
      className={styles.explorer_wrapper}
      onContextMenu={(e) => {
        e.preventDefault();
        // set our click state to true when a user right clicks
        setClicked(true);

        // set the x and y coordinates of our users right click
        setCoords({ x: e.pageX, y: e.pageY });
      }}
    >
      {clicked && <ContextMenu top={coords.y} left={coords.x} items={[]} />}

      <TreeView
        data={data}
        selectedId={props.selectedId}
        itemClickedHandler={props.itemClickedHandler}
      />
    </div>
  );
}
