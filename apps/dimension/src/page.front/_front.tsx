import type { File } from "@prisma/client";
import { useState } from "react";

import type { UserWithRelations } from "../api/requests";
import AppWrapper from "../app.wrapper/_app.wrapper";
import { Editor } from "../page.editor/_editor";

import * as styles from "./_front.style";

export type FrontpageProps = {
  user: UserWithRelations | null;
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
