import { faFolder, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, File } from "@prisma/client";
import { useEffect, useState } from "react";

import type { UserWithRelations } from "../api/requests";
import type { ContextMenuItem } from "../component.contextmenu/_contextmenu";
import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";

import * as styles from "./_explorer.styles";

export type ExplorerProps = {
  user: UserWithRelations;
  fileClickedHandler: (file: File) => void;
};

type ExplorerItem = {
  item: File | Folder;
  type: string;
  selected: boolean;
  highlight: boolean;
  edit: boolean;
};

export function Explorer(props: ExplorerProps) {
  const { clicked, setClicked, coords, setCoords } = useContextMenu();
  const [selectedItem, setSelectedItem] = useState<File | Folder>();
  const [selectedId, setSelectedId] = useState<string>();
  const [contextMenuItems, setContextMenuItems] = useState<ContextMenuItem[]>(
    [],
  );

  const generateItems = (folders: Folder[], files: File[]): ExplorerItem[] => {
    return [
      ...folders.map((f) => {
        return {
          item: f,
          type: "folder",
          selected: false,
          highlight: false,
          edit: false,
        };
      }),
      ...files.map((f) => {
        return {
          item: f,
          type: "file",
          selected: false,
          highlight: false,
          edit: false,
        };
      }),
    ];
  };

  const expItems = generateItems(props.user?.folders, props.user?.files);

  useEffect(() => {
    const generalItems: ContextMenuItem[] = [
      {
        text: "Rename",
        clickHandler: () => {
          console.log("rename");
        },
      },
      {
        text: "Delete",
        clickHandler: () => {
          console.log("delete");
        },
      },
    ];

    if (selectedId?.includes("folder")) {
      setContextMenuItems([
        {
          text: "New file",
          clickHandler: () => {
            console.log("new file");
          },
        },
        {
          text: "New folder",
          clickHandler: () => {
            console.log("new folder");
          },
        },
        ...generalItems,
      ]);
    } else {
      setContextMenuItems(generalItems);
    }
  }, [selectedId, selectedItem]);

  const setSelected = (item: File | Folder, type: string) => {
    setSelectedItem(item);
    setSelectedId(type + item.id);
  };

  const generateFolder = (folderItem: ExplorerItem, depth: number) => {
    // const childFolders = folders.filter((f) => f.folderId === folder.id);
    // const childFiles = files.filter((f) => f.folderId === folder.id);

    const folder = folderItem.item;
    const childItems = expItems.filter((e) => e.item.folderId === folder.id);
    return (
      <li key={"folder-item" + folder.id} id="folder">
        <details key={"folder-button" + folder.id}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <summary
            className={cx(
              styles.item,
              selectedId === "folder" + folder.id ? "selected" : "",
            )}
            onClick={() => setSelected(folder, "folder")}
            onContextMenu={() => setSelected(folder, "folder")}
          >
            {/** @ts-expect-error poor typings */}
            <div className={styles.indentation} style={{ "--depth": depth }}>
              <FontAwesomeIcon icon={faFolder} />
              <span className={styles.item_text}>{folder.title}</span>
            </div>
          </summary>
          {childItems
            .filter((e) => e.type === "folder")
            .map((e) => (
              <ul key={"folder" + e.item.id}>
                {" "}
                {generateFolder(e, depth + 1)}{" "}
              </ul>
            ))}
          <ul key={"files" + folder.id}>
            {" "}
            {generateFiles(
              childItems.filter((f) => f.type === "file"),
              depth + 1,
            )}
          </ul>
        </details>
      </li>
    );
  };

  const generateFiles = (fileItems: ExplorerItem[], depth: number) => {
    return fileItems.map((fileItem) => {
      const file = fileItem.item as File;
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          id="file"
          key={"file" + file.id}
          onClick={() => {
            setSelected(file, "file");
            props.fileClickedHandler(file);
          }}
          onContextMenu={() => setSelected(file, "file")}
        >
          <div
            className={cx(
              styles.item,
              styles.indentation,
              selectedId === "file" + file.id ? "selected" : "",
            )}
            /** @ts-expect-error poor typings */
            style={{ "--depth": depth }}
          >
            <FontAwesomeIcon icon={faFileLines} />
            <span className={styles.item_text}>{file.title + file.id}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <div
      className={styles.wrapper}
      onContextMenu={(e) => {
        e.preventDefault();
        // set our click state to true when a user right clicks
        setClicked(true);

        // set the x and y coordinates of our users right click
        setCoords({ x: e.pageX, y: e.pageY });
      }}
    >
      {clicked && (
        <ContextMenu top={coords.y} left={coords.x} items={contextMenuItems} />
      )}

      <ul className={styles.tree}>
        {expItems
          .filter((e) => e.item.folderId === null && e.type === "folder")
          .map((folder) => generateFolder(folder, 1))}
        {generateFiles(
          expItems.filter((e) => e.item.folderId === null && e.type === "file"),
          1,
        )}
      </ul>
    </div>
  );
}
