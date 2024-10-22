import { faFolder, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, File } from "@prisma/client";
import { useState } from "react";

import type { ContextMenuItem } from "../component.dropdown/_contextmenu";
import { ContextMenu } from "../component.dropdown/_contextmenu";
import { useContextMenu } from "../component.dropdown/_contextmenu.hooks";

import * as styles from "./_explorer.styles";

export type ExplorerProps = {
  folders: Folder[];
  files: File[];
  fileClickedHandler: (file: File) => void;
};

export function Explorer(props: ExplorerProps) {
  const { folders, files } = props;
  const { clicked, setClicked, coords, setCoords } = useContextMenu();
  const [selectedItem, setSelectedItem] = useState<File | Folder>();
  const [selectedId, setSelectedId] = useState<string>();

  const setSelected = (item: File | Folder, type: string) => {
    setSelectedItem(item);
    setSelectedId(type + item.id);
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      text: "New file",
      clickHandler: (e) => {
        console.log(e);
      },
    },
    {
      text: "New folder",
      clickHandler: () => {
        console.log("new folder!");
      },
    },
  ];

  const generateFolder = (folder: Folder, depth: number) => {
    const childFolders = folders.filter((f) => f.folderId === folder.id);
    const childFiles = files.filter((f) => f.folderId === folder.id);

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
          >
            <div style={{ paddingLeft: 20 + 7 * depth++ + "px" }}>
              <FontAwesomeIcon icon={faFolder} />
              <span className={styles.item_text}>{folder.title}</span>
            </div>
          </summary>
          {childFolders.map((f) => (
            <ul key={"folder" + f.id}> {generateFolder(f, depth)} </ul>
          ))}
          <ul key={"files" + folder.id}> {generateFiles(childFiles, depth)}</ul>
        </details>
      </li>
    );
  };

  const generateFiles = (_files: File[], depth: number) => {
    return _files.map((file) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          id="file"
          key={"file" + file.id}
          onClick={() => {
            setSelected(file, "file");
            props.fileClickedHandler(file);
          }}
        >
          <div
            className={cx(
              styles.item,
              selectedId === "file" + file.id ? "selected" : "",
            )}
            style={{ paddingLeft: 20 + 7 * depth + "px" }}
          >
            <FontAwesomeIcon icon={faFileLines} />
            <span className={styles.item_text}>{file.title + file.id}</span>
          </div>
        </li>
      );
    });
  };

  // const generateFileTree = () => {
  //   return <></>;
  // };
  return (
    <div
      className={styles.wrapper}
      onContextMenu={(e) => {
        e.preventDefault();
        console.log(e);
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
        {folders
          .filter((f) => f.folderId === null)
          .map((folder) => generateFolder(folder, 1))}
        {generateFiles(
          files.filter((f) => f.folderId === null),
          1,
        )}
      </ul>
    </div>
  );
}

{
  /* 
   * <summary className={styles.item}>Giant planets</summary> 
          <ul>
            <li>
              <details>
                <summary className={styles.item}>Gas giants</summary>
                <ul>
                  <li className={styles.item}>Jupiter</li>
                  <li className={styles.item}>Saturn</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className={styles.item}>Ice giants</summary>
                <ul>
                  <li className={styles.item}>Uranus</li>
                  <li className={styles.item}>Neptune</li>
                </ul>
              </details>
            </li>
          </ul> */
}
