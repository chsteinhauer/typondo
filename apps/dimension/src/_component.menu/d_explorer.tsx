import { faFolder, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, File } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

import {
  createFile,
  removeFile,
  updateFile,
  updateFolder,
  type UserWithRelations,
} from "../api/requests";
import type { ContextMenuItem } from "../component.contextmenu/_contextmenu";
import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";
import { InputEdit } from "../component.inputedit/_input-edit";

import * as styles from "./d_explorer.styles";

export type ExplorerProps = {
  user: UserWithRelations;
  fileClickedHandler: (file: File) => void;
};

type ExplorerItem = {
  item: File | Folder;
  type: string;
  selected: boolean;
};

export function Explorer(props: ExplorerProps) {
  const { clicked, setClicked, coords, setCoords } = useContextMenu();
  const [selectedItem, setSelectedItem] = useState<ExplorerItem>();
  const [contextMenuItems, setContextMenuItems] = useState<ContextMenuItem[]>(
    [],
  );
  const [editableItemId, setEditableItemId] = useState<string>();
  const [saveAsFunc, setSaveAsFunc] = useState<(value: string) => void>(() => {
    console.log("tmp save func");
  });

  const [files, setFiles] = useState<File[]>(props.user.files);
  const [folders, setFolders] = useState<Folder[]>(props.user.folders);

  const explorerItems = useMemo(
    () => [
      ...folders.map((f) => {
        return {
          item: f,
          type: "folder",
          selected: false,
        };
      }),
      ...files.map((f) => {
        return {
          item: f,
          type: "file",
          selected: false,
        };
      }),
    ],
    [files, folders],
  );

  //const expItems = generateItems(props.user?.folders, props.user?.files);
  //setExplorerItems(expItems);

  useEffect(() => {
    const modifyItems: ContextMenuItem[] = [
      {
        text: "Rename",
        clickHandler: () => {
          console.log("rename");

          const saveItem = async (value: string) => {
            if (!selectedItem) return;

            const item = selectedItem.item;

            item.title = value;

            if (selectedItem.type === "folder") {
              await updateFolder(item as Folder);
            } else {
              await updateFile(item as File);
            }

            setEditableItemId(undefined);
          };

          setSaveAsFunc(() => saveItem);
          setEditableItemId(selectedItem?.item.id);
        },
      },
      {
        text: "Delete",
        clickHandler: async () => {
          console.log("delete");

          const item = selectedItem?.item;

          if (selectedItem?.type === "file") {
            await removeFile(item as File);

            setFiles((prev) => {
              const next = [...prev];

              const index = next.findIndex((f) => f.id === item?.id);
              if (index > -1) {
                next.splice(index, 1);
              }

              return next;
            });
          }
        },
      },
    ];

    const createItems: ContextMenuItem[] = [
      {
        text: "New file",
        clickHandler: async () => {
          console.log("new file");

          const tmpFile = {
            //id: tmpID,
            title: "",
            folderId: selectedItem?.item.id,
            authorId: props.user.id,
            htmlContent: "",
          };

          const res = await createFile(tmpFile as File);

          setFiles((prev) => [...prev, res.file]);

          const saveFile = async (value: string) => {
            res.file.title = value;
            await updateFile(res.file);
            setEditableItemId(undefined);
          };

          setSaveAsFunc(() => saveFile);
          setEditableItemId(res.file.id);

          //setSelectedItem(tmpFile);
        },
      },
      {
        text: "New folder",
        clickHandler: () => {
          console.log("new folder");
        },
      },
    ];

    if (!selectedItem) {
      setContextMenuItems(createItems);
    } else if (selectedItem?.type === "folder") {
      setContextMenuItems([...createItems, ...modifyItems]);
    } else {
      setContextMenuItems(modifyItems);
    }
  }, [
    explorerItems,
    props.user.files,
    props.user.folders,
    props.user.id,
    selectedItem,
  ]);

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
    const childItems = explorerItems.filter(
      (e) => e.item.folderId === folder.id,
    );
    return (
      <li key={"folder-item" + folder.id} id="folder">
        <details key={"folder-button" + folder.id}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <summary
            className={cx(
              styles.item,
              folder.id === selectedItem?.item.id ? "selected" : "",
            )}
            onClick={() => setSelected(folderItem)}
            onContextMenu={() => setSelected(folderItem)}
          >
            <div
              className={cx(styles.indentation, styles.content)}
              // @ts-expect-error poor typings
              style={{ "--depth": depth }}
            >
              <FontAwesomeIcon icon={faFolder} />
              <InputEdit
                key={folder.id}
                value={folder.title}
                editMode={editableItemId === folder.id}
                onSave={saveAsFunc}
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
              fileItem.item.id === selectedItem?.item.id ? "selected" : "",
            )}
            /** @ts-expect-error poor typings */
            style={{ "--depth": depth }}
          >
            <FontAwesomeIcon icon={faFileLines} />
            <InputEdit
              value={file.title}
              editMode={editableItemId === file.id}
              onSave={saveAsFunc}
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
        {explorerItems
          .filter((e) => e.item.folderId === null && e.type === "folder")
          .map((folder) => generateFolder(folder, 1))}
        {generateFiles(
          explorerItems.filter(
            (e) => e.item.folderId === null && e.type === "file",
          ),
          1,
        )}
      </ul>
    </div>
  );
}
