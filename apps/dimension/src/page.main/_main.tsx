import type { File, Folder } from "@prisma/client";
import { useEffect, useState } from "react";

import { createFile, createFolder } from "../api/requests";
import { Menu } from "../component.menu/_menu";
import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { EditorView } from "../page.editor/_editor";

import { ItemType, type Item, type MainProps } from "./_main.interfaces";
import * as styles from "./_main.style";

export function Main(props: MainProps) {
  // data structure states
  const [files, setFiles] = useState<File[]>(props.user?.files ?? []);
  const [folders, setFolders] = useState<Folder[]>(props.user?.folders ?? []);
  const [items, setItems] = useState<Item[]>([]);

  // interacted data states
  const [openItems, setOpenItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [focusItem, setFocusItem] = useState<Item>();

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
          type: ItemType.FOLDER,
        };
      }),
      ...files.map((file: File) => {
        return {
          id: file.id,
          item: file,
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
      setFocusItem(item);
      setOpenItems((items) => {
        if (!items.find((f) => f.id === item.id)) items.push(item);
        return items;
      });
    }
  };

  const closeTabClickedHandler = (item: Item) => {
    setOpenItems((prev) => {
      const next = [...prev];
      const index = next.findIndex((f) => f.id === item.id);

      if (index > -1) next.splice(index, 1);

      if (prev[index]?.id === focusItem?.id && !!next.length) {
        setSelectedItem(next[next.length - 1]);
        setFocusItem(next[next.length - 1]);
        console.log("hello?");
      }

      if (!next.length) {
        setFocusItem(undefined);
        setSelectedItem(undefined);
      }

      return next;
    });
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_menu}>
        <Menu
          user={props.user}
          items={items}
          itemClickedHandler={itemClickedHandler}
          createItemHandler={createItemHandler}
          selectedId={selectedItem?.id}
        />
      </div>
      <div className={styles.main_content}>
        {openItems.length > 0 && (
          <div className={styles.main_tab_wrapper}>
            <TabWrapper>
              {openItems.map((item) => (
                <Tab
                  key={item.id}
                  item={item}
                  selected={
                    item.id === selectedItem?.id || item.id === focusItem?.id
                  }
                  closeTabClickedHandler={closeTabClickedHandler}
                  itemClickedHandler={itemClickedHandler}
                />
              ))}
            </TabWrapper>
          </div>
        )}
        <div className={styles.main_panel}>
          {focusItem?.type === ItemType.FILE && (
            <EditorView key={focusItem.id} file={focusItem.item as File} />
          )}
        </div>
      </div>
    </div>
  );
}
