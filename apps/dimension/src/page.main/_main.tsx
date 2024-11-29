import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { File, Folder } from "@prisma/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createFile, createFolder } from "../api/requests";
import { Menu } from "../component.menu/_menu";
import { WindowWrapper } from "../page.window/_window-wrapper";
import type { RootState } from "../store";

import { setFocus, setSelected } from "./_item-state";
import { getPositionEnum } from "./_layer-logic";
import { addContentLayer } from "./_layer-state";
import type { ContentLayer, Item, MainProps } from "./_main.interfaces";
import { ItemType } from "./_main.interfaces";
import * as styles from "./_main.style";

export function Main(props: MainProps) {
  // data structure states
  const [files, setFiles] = useState<File[]>(props.user?.files ?? []);
  const [folders, setFolders] = useState<Folder[]>(props.user?.folders ?? []);
  const [items, setItems] = useState<Item[]>([]);

  // interacted data states
  // const [openItems, setOpenItems] = useState<Item[]>([]);
  // const [selectedItem, setSelectedItem] = useState<Item>();
  // const [focusItem, setFocusItem] = useState<Item>();
  const [dropzonePosition, setDropzonePosition] = useState<string>();
  const [dropzoneId, setDropzoneId] = useState<string>();
  const [draggedItem, setDraggedItem] = useState<Item>();

  const selected = useSelector((state: RootState) => state.layer.selected);
  const focus = useSelector((state: RootState) => state.layer.focus);
  const root = useSelector((state: RootState) => state.layer.root);
  const dispatch = useDispatch();

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // temporary dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", true);
  }, []);

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark-purple-palette", true);
  // }, []);

  useEffect(() => {
    if (!props.user) return;

    setItems([
      ...folders.map((folder: Folder) => {
        return {
          id: folder.id,
          item: folder,
          path: [],
          type: ItemType.FOLDER,
        };
      }),
      ...files.map((file: File) => {
        return {
          id: file.id,
          item: file,
          path: [],
          type: ItemType.FILE,
        };
      }),
    ]);
  }, [props.user, files, folders]);

  const createItemHandler = async (item: Item) => {
    switch (item.type) {
      case ItemType.FILE: {
        const file = (await createFile(item.item as File)).file;

        setFiles((prev) => [...prev, file]);
        break;
      }

      case ItemType.FOLDER: {
        const folder = (await createFolder(item.item as Folder)).folder;

        setFolders((prev) => [...prev, folder]);
        break;
      }

      default:
        break;
    }
  };

  const tabClickedHandler = (item: Item) => {
    dispatch(setSelected(item));
    dispatch(setFocus(item));
  };

  const closeTabClickedHandler = (layer: ContentLayer, item: Item) => {
    // setOpenItems((prev) => {
    //   const next = [...prev];
    //   const index = next.findIndex((f) => f.id === item.id);
    //   if (index > -1) next.splice(index, 1);
    //   if (prev[index]?.id === focusItem?.id && !!next.length) {
    //     setSelectedItem(next[next.length - 1]);
    //     setFocusItem(next[next.length - 1]);
    //     console.log("hello?");
    //   }
    //   if (!next.length) {
    //     setFocusItem(undefined);
    //     setSelectedItem(undefined);
    //   }
    //   return next;
    // });
    // const tabLayer = findItemTab(item.id);
    // const index = tabLayer?.items.findIndex((f) => f.id === item.id);
    // if (index > -1) tabLayer.items = [...tabLayer.items.splice(index, 1)];
  };

  const dragEndHandler = (event) => {
    const { over } = event;

    if (over?.data.current?.position && draggedItem) {
      const position = getPositionEnum(over.data.current.position);

      dispatch(
        addContentLayer({ parentId: over.id, item: draggedItem, position }),
      );
    }

    document.documentElement.classList.toggle("droppable-visible", false);

    const ref = document.getElementsByClassName(
      "window_dropzone_overlay_selector",
    );

    if (dropzonePosition) {
      ref.item(0)?.classList.remove(dropzonePosition);
    }

    setDraggedItem(undefined);
  };

  const dragStartHandler = (event) => {
    document.documentElement.classList.toggle("droppable-visible", true);

    const { active } = event;

    const item = items.find((i) => i.id === active?.id);

    if (item) {
      setDraggedItem(item);
    }
  };

  const dragOverHandler = (event) => {
    const { over } = event;

    if (over?.data.current?.position) {
      const pos = over.data.current.position;

      const id = over.id.replace(pos + "-", "");
      const ref = document.getElementsByClassName(
        "window_dropzone_overlay_selector" + id,
      );

      ref.item(0)?.classList.add(pos);
      setDropzonePosition(pos);
      setDropzoneId(id);
    } else if (dropzonePosition && dropzoneId) {
      const ref = document.getElementsByClassName(
        "window_dropzone_overlay_selector" + dropzoneId,
      );

      ref.item(0)?.classList.remove(dropzonePosition);

      setDropzonePosition(undefined);
      setDropzoneId(undefined);
    }
  };

  return (
    <div className={styles.main_wrapper}>
      <DndContext
        onDragEnd={dragEndHandler}
        onDragStart={dragStartHandler}
        onDragOver={dragOverHandler}
        sensors={sensors}
      >
        <div className={styles.main_menu}>
          <Menu
            user={props.user}
            items={items}
            itemClickedHandler={() => {}}
            createItemHandler={createItemHandler}
            selectedId={selected?.id}
          />
        </div>

        {root && root.children.length > 0 && (
          <WindowWrapper
            layer={root}
            handlers={{ tabClickedHandler, closeTabClickedHandler }}
            states={{ selectedItem: selected, focusItem: focus }}
          />
        )}
      </DndContext>
    </div>
  );
}
