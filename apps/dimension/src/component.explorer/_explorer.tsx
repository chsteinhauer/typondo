import {
  faFileCirclePlus,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useReducer, useState } from "react";

import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";
import { TMP_ID } from "../global.static";
import { ItemType, type Item } from "../page.main/_main.interfaces";

import type { ExplorerProps, TreeNode } from "./_explorer.interfaces";
import * as styles from "./_explorer.styles";
import TreeView from "./_tree-view";

export function Explorer(props: ExplorerProps) {
  const { clicked, setClicked, coords, setCoords } = useContextMenu();

  const [items, setItems] = useState<Item[]>([]);
  const [editableId, setEditableId] = useState<string>();

  useEffect(() => setItems(props.items), [props.items]);

  const data = useMemo(() => {
    const genTreeData = (item: Item, depth: number): TreeNode => {
      return {
        id: item.id,
        name: item.item.title,
        item: item,
        depth,
        isOpen: false,
        children: [
          ...items
            .filter((c) => c.item.folderId === item.id)
            .map((c) => genTreeData(c, depth + 1)),
        ],
      };
    };

    const root = items.filter((i) => !i.item.folderId);

    return [...root.map((i) => genTreeData(i, 0))];
  }, [items]);

  function reducer(state: TreeNode[], action) {}

  const [state, dispatch] = useReducer(reducer, data);

  const explorerClickedHandler = () => {
    props.itemClickedHandler(undefined);
  };

  const addItemClickedHandler = async (type: ItemType) => {
    const parent = items.find((i) => i.id === props.selectedId);

    const tmp = {
      id: TMP_ID,
      title: "",
      authorId: props.user.id,
      folderId:
        parent?.type === ItemType.FOLDER ? parent.id : parent?.item.folderId,
    };

    // const file = (await createFile(tmp as File)).file;

    // const item = {
    //   id: file.id,
    //   item: file,
    //   type: ItemType.FILE,
    // };
    const item = {
      id: TMP_ID,
      item: tmp,
      type,
    };

    setItems((prev) => {
      const items = [...prev];
      items.push(item as Item);

      return items;
    });

    setEditableId(TMP_ID);
  };

  const onSaveHandler = async (value: string, item: Item) => {
    // If it is a new entry and user has left it empty, it is assumed
    // user does not want the file to be created
    if (!value && item.id === TMP_ID) {
      setItems((prev) => {
        const items = [...prev];
        const index = items.findIndex((f) => f.id === item.id);

        if (index > -1) items.splice(index, 1);

        return items;
      });
      return;
    }

    item.item.title = value;
    await props.createItemHandler(item);

    setEditableId(undefined);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={styles.explorer_wrapper}
      onClick={explorerClickedHandler}
      onContextMenu={(e) => {
        e.preventDefault();
        // explorerClickedHandler();
        // set our click state to true when a user right clicks
        setClicked(true);

        // set the x and y coordinates of our users right click
        setCoords({ x: e.pageX, y: e.pageY });
      }}
    >
      {clicked && <ContextMenu top={coords.y} left={coords.x} items={[]} />}
      <div className={styles.explorer_add_button_wrapper}>
        <button
          className={styles.explorer_add_button}
          onClick={() => addItemClickedHandler(ItemType.FILE)}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>

        <button
          className={styles.explorer_add_button}
          onClick={() => addItemClickedHandler(ItemType.FOLDER)}
        >
          <FontAwesomeIcon icon={faFolderPlus} />
        </button>
      </div>
      <TreeView
        editableId={editableId}
        data={data}
        selectedId={props.selectedId}
        itemClickedHandler={props.itemClickedHandler}
        onSaveHandler={onSaveHandler}
      />
    </div>
  );
}
