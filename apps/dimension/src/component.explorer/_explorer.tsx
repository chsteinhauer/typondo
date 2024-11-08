import type { Folder, File } from "@prisma/client";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import type { UserWithRelations } from "../api/requests";
import type { ContextMenuItem } from "../component.contextmenu/_contextmenu";
import { ContextMenu } from "../component.contextmenu/_contextmenu";
import { useContextMenu } from "../component.contextmenu/_contextmenu.hooks";

import * as styles from "./_explorer.styles";
import type { TreeNode } from "./_tree-view";
import TreeView, { TreeNodeType } from "./_tree-view";

export type ExplorerProps = {
  user: UserWithRelations;
  fileClickedHandler: (file: File) => void;
  selectedId?: string;
};

export function Explorer(props: ExplorerProps) {
  const { clicked, setClicked, coords, setCoords } = useContextMenu();

  const [files, setFiles] = useState<File[]>(props.user.files);
  const [folders, setFolders] = useState<Folder[]>(props.user.folders);

  const genFileNode = (file: File): TreeNode => {
    return {
      id: file.id,
      name: file.title,
      item: file,
      type: TreeNodeType.FILE,
    };
  };

  const data = useMemo(() => {
    const genTreeData = (folder: Folder): TreeNode => {
      return {
        id: folder.id,
        name: folder.title,
        item: folder,
        type: TreeNodeType.FOLDER,
        children: [
          ...folders
            .filter((f) => f.folderId === folder.id)
            .map((f) => genTreeData(f)),
          ...files
            .filter((f) => f.folderId === folder.id)
            .map((f) => genFileNode(f)),
        ],
      };
    };

    const rootFolders = folders.filter((f) => !f.folderId);
    const rootFiles = files.filter((f) => !f.folderId);

    return [
      ...rootFolders.map((f) => genTreeData(f)),
      ...rootFiles.map((f) => genFileNode(f)),
    ];
  }, [folders, files]);

  return (
    <div
      className={styles.explorer_wrapper}
      onContextMenu={(e) => {
        e.preventDefault();
        // set our click state to true when a user right clicks
        setClicked(true);

        // set the x and y coordinates of our users right click
        setCoords({ x: e.pageX, y: e.pageY });
      }}
    >
      {clicked && <ContextMenu top={coords.y} left={coords.x} items={[]} />}

      <TreeView
        data={data}
        selectedId={props.selectedId}
        fileClickedHandler={props.fileClickedHandler}
      />
    </div>
  );
}
