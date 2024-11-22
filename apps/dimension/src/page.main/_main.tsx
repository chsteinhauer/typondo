import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { File, Folder } from "@prisma/client";
import { useEffect, useState } from "react";

import { createFile, createFolder } from "../api/requests";
import { Menu } from "../component.menu/_menu";
import { WindowWrapper } from "../page.window/_window-wrapper";

import { useLayers } from "./_layer.hooks";
import type { ContentLayer, Item, MainProps } from "./_main.interfaces";
import { ItemType } from "./_main.interfaces";
import * as styles from "./_main.style";

export function Main(props: MainProps) {
  const { rootLayer, addContentLayer, findItemTab } = useLayers();

  // data structure states
  const [files, setFiles] = useState<File[]>(props.user?.files ?? []);
  const [folders, setFolders] = useState<Folder[]>(props.user?.folders ?? []);
  const [items, setItems] = useState<Item[]>([]);

  // interacted data states
  // const [openItems, setOpenItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [focusItem, setFocusItem] = useState<Item>();
  const [dropzonePosition, setDropzonePosition] = useState<
    string | undefined
  >();

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

  useEffect(() => {
    document.documentElement.classList.toggle("dark-purple-palette", true);
  }, []);

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

  const itemClickedHandler = (item?: Item) => {
    if (!item) {
      setSelectedItem(undefined);

      return;
    }

    setSelectedItem(item);

    if (item.type === ItemType.FILE) {
      const tabLayer = findItemTab(item);

      if (tabLayer) {
        tabLayer.open = item;
      } else {
        if (!focusItem) {
          addContentLayer("root", item);
        } else {
          const layer = findItemTab(focusItem);

          if (!layer)
            throw new Error(
              "there should be a layer here bro, time for debugging",
            );

          layer.items.push(item);
        }
      }

      setFocusItem(item);

      //addContentLayer("root", item);
      // setFocusItem(item);
      // setOpenItems((items) => {
      //   if (!items.find((f) => f.id === item.id)) items.push(item);
      //   return items;
      // });
    }
  };

  const tabClickedHandler = (item: Item) => {
    setSelectedItem(item);
    setFocusItem(item);
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
    // const tabLayer = findItemTab(item);
    // const index = tabLayer?.items.findIndex((f) => f.id === item.id);
    // if (index > -1) tabLayer.items = [...tabLayer.items.splice(index, 1)];
  };

  const dragEndHandler = (event) => {
    const { over } = event;

    console.log(over);

    document.documentElement.classList.toggle("droppable-visible", false);
  };

  const dragStartHandler = (event) => {
    document.documentElement.classList.toggle("droppable-visible", true);
  };

  const dragMoveHandler = (event) => {
    const { over } = event;

    const ref = document.getElementsByClassName(
      "window_dropzone_overlay_selector",
    );

    if (over) {
      const pos = over.data.current.position;

      ref.item(0)?.classList.add(pos);
      setDropzonePosition(pos);
    } else if (dropzonePosition) {
      ref.item(0)?.classList.remove(dropzonePosition);
    }
  };

  return (
    <div className={styles.main_wrapper}>
      <DndContext
        onDragEnd={dragEndHandler}
        onDragStart={dragStartHandler}
        onDragOver={dragMoveHandler}
        sensors={sensors}
      >
        <div className={styles.main_menu}>
          <Menu
            user={props.user}
            items={items}
            itemClickedHandler={itemClickedHandler}
            createItemHandler={createItemHandler}
            selectedId={selectedItem?.id}
          />
        </div>

        {rootLayer && rootLayer.children.length > 0 && (
          <WindowWrapper
            layer={rootLayer}
            handlers={{ tabClickedHandler, closeTabClickedHandler }}
            states={{ selectedItem }}
          />
        )}
      </DndContext>
    </div>
  );
}
