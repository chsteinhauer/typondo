import type { File } from "@prisma/client";
import { useState } from "react";

import type { UserWithRelations } from "../api/requests";
import AppWrapper from "../app.wrapper/_app.wrapper";
import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
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

  const closeTabClickedHandler = (file: File) => {
    setOpenFiles((files) => {
      const _files = [...files];
      const index = _files.findIndex((f) => f.id === file.id);

      if (index > -1) _files.splice(index, 1);

      if (files[index]?.id === selectedFile?.id && !!_files.length) {
        setSelectedFile(_files[_files.length - 1]);
      }

      return _files;
    });
  };

  return (
    <AppWrapper
      menu={{
        user: props.user,
        fileClickedHandler,
      }}
    >
      <div className={styles.front_wrapper}>
        {openFiles.length > 0 && (
          <div className={styles.front_tab_wrapper}>
            <TabWrapper>
              {openFiles.map((f) => (
                <Tab
                  key={f.id}
                  file={f}
                  closeTabClickedHandler={closeTabClickedHandler}
                  fileClickedHandler={fileClickedHandler}
                />
              ))}
            </TabWrapper>
          </div>
        )}
        <div className={styles.front_panel}>
          {selectedFile && <Editor key={selectedFile.id} file={selectedFile} />}
        </div>
      </div>
    </AppWrapper>
  );
}
