import { faFolder, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, File } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  updateFile,
  updateFolder,
  type UserWithRelations,
} from "../api/requests";
import type { ContextMenuItem } from "../component.contextmenu/_contextmenu";
import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";
import { InputEdit } from "../component.editinput/_editinput";

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
  const [selectedItem, setSelectedItem] = useState<ExplorerItem>();
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

    if (selectedItem?.type === "folder") {
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
  }, [selectedItem]);

  const setSelected = (expItem: ExplorerItem) => {
    setSelectedItem((prev) => {
      if (prev) prev.selected = false;
      expItem.selected = true;

      return expItem;
    });
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
              selectedItem?.type === "folder" &&
                folderItem.item.id === selectedItem?.item.id
                ? "selected"
                : "",
            )}
            onClick={() => setSelected(folderItem)}
            onContextMenu={() => setSelected(folderItem)}
          >
            <div
              className={cx(styles.indentation, styles.content)}
              //{/** @ts-expect-error poor typings */}
              style={{ "--depth": depth }}
            >
              <FontAwesomeIcon icon={faFolder} />
              <InputEdit
                value={folder.title}
                onSave={async (value: string) => {
                  folder.title = value;
                  await updateFolder(folder);
                }}
              />
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
            setSelected(fileItem);
            props.fileClickedHandler(file);
          }}
          onContextMenu={() => setSelected(fileItem)}
        >
          <div
            className={cx(
              styles.item,
              styles.content,
              styles.indentation,
              selectedItem?.type === "file" &&
                fileItem.item.id === selectedItem?.item.id
                ? "selected"
                : "",
            )}
            /** @ts-expect-error poor typings */
            style={{ "--depth": depth }}
          >
            <FontAwesomeIcon icon={faFileLines} />
            <InputEdit
              value={file.title}
              onSave={async (value: string) => {
                file.title = value;
                await updateFile(file);
              }}
            />
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
