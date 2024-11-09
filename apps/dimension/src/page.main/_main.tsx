import type { File, Folder } from "@prisma/client";
import { useEffect, useState } from "react";

import { Menu } from "../component.menu/_menu";
import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { Editor } from "../page.editor/_editor";

import { ItemType, type Item, type MainProps } from "./_main.interfaces";
import * as styles from "./_main.style";

export function Main(props: MainProps) {
  const [openItems, setOpenItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [focusItem, setFocusItem] = useState<Item>();
  const [items, setItems] = useState<Item[]>([]);

  // temporary
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", true);
  }, []);

  useEffect(() => {
    if (!props.user) return;

    const { folders, files } = props.user;

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
  }, [props.user]);

  const itemClickedHandler = (item: Item) => {
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
    setOpenItems((items) => {
      const _items = [...items];
      const index = _items.findIndex((f) => f.id === item.id);

      if (index > -1) _items.splice(index, 1);

      if (items[index]?.id === selectedItem?.id && !!_items.length) {
        setSelectedItem(_items[_items.length - 1]);
      }

      return _items;
    });
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_menu}>
        <Menu
          items={items}
          itemClickedHandler={itemClickedHandler}
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
                  selected={item.id === selectedItem?.id}
                  closeTabClickedHandler={closeTabClickedHandler}
                  itemClickedHandler={itemClickedHandler}
                />
              ))}
            </TabWrapper>
          </div>
        )}
        <div className={styles.main_panel}>
          {focusItem?.type === ItemType.FILE && (
            <Editor key={focusItem.id} file={focusItem.item as File} />
          )}
        </div>
      </div>
    </div>
  );
}
