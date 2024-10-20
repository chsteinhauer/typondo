import { faFolder, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Folder, File } from "@prisma/client";

import * as styles from "./_explorer.styles";

export type ExplorerProps = {
  folders: Folder[];
  files: File[];
  fileClickedHandler: (file: File) => void;
};

export function Explorer(props: ExplorerProps) {
  const { folders, files } = props;

  const generateFolder = (folder: Folder) => {
    const childFolders = folders.filter((f) => f.folderId === folder.id);
    const childFiles = files.filter((f) => f.folderId === folder.id);

    return (
      <li key={"folder-item" + folder.id}>
        <details key={"folder-button" + folder.id}>
          <summary className={styles.item}>
            <FontAwesomeIcon icon={faFolder} />
            <span className={styles.item_text}>{folder.title}</span>
          </summary>
          {childFolders.map((f) => (
            <ul key={"folder" + f.id}> {generateFolder(f)} </ul>
          ))}
          <ul key={"files" + folder.id}> {generateFiles(childFiles)}</ul>
        </details>
      </li>
    );
  };

  const generateFiles = (_files: File[]) => {
    return _files.map((file) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={"file" + file.id}
          className={styles.item}
          onClick={() => props.fileClickedHandler(file)}
        >
          <FontAwesomeIcon icon={faFileLines} />
          <span className={styles.item_text}>{file.title + file.id}</span>
        </li>
      );
    });
  };

  // const generateFileTree = () => {
  //   return <></>;
  // };
  return (
    <ul className={styles.tree}>
      {folders
        .filter((f) => f.folderId === null)
        .map((folder) => generateFolder(folder))}
      {generateFiles(files.filter((f) => f.folderId === null))}
    </ul>
  );
}

{
  /* <summary className={styles.item}>Giant planets</summary>
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
