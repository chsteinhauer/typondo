import type { Folder, User, File } from "@prisma/client";
import { useState } from "react";

import AppWrapper from "../app.wrapper/app.wrapper";
import { Editor } from "../page.editor/_editor";

import * as styles from "./_front.style";

export type FrontpageProps = {
  user: User | null;
  folders: Folder[];
  files: File[];
};

export function Frontpage(props: FrontpageProps) {
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const fileClickedHandler = (file: File) => {
    setSelectedFile(file);
    setOpenFiles((files) => {
      if (!files.find((f) => f.id === file.id)) files.push(file);
      return files;
    });
  };

  return (
    <AppWrapper
      menu={{
        files: props.files,
        folders: props.folders,
        user: props.user,
        fileClickedHandler,
      }}
    >
      <div className={styles.wrapper}>
        {selectedFile && <Editor key={selectedFile.id} file={selectedFile} />}
      </div>
    </AppWrapper>
  );
}
