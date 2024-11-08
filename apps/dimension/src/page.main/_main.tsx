import type { File } from "@prisma/client";
import { useState } from "react";

import type { UserWithRelations } from "../api/requests";
import { Menu } from "../component.menu/_menu";
import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { Editor } from "../page.editor/_editor";

import * as styles from "./_main.style";

export type MainProps = {
  user: UserWithRelations | null;
};

export function Main(props: MainProps) {
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
    <div className={styles.main_wrapper}>
      <div className={styles.main_menu}>
        <Menu
          user={props.user}
          fileClickedHandler={fileClickedHandler}
          selectedId={selectedFile?.id}
        />
      </div>
      <div className={styles.main_content}>
        {openFiles.length > 0 && (
          <div className={styles.main_tab_wrapper}>
            <TabWrapper>
              {openFiles.map((f) => (
                <Tab
                  key={f.id}
                  file={f}
                  selected={f.id === selectedFile?.id}
                  closeTabClickedHandler={closeTabClickedHandler}
                  fileClickedHandler={fileClickedHandler}
                />
              ))}
            </TabWrapper>
          </div>
        )}
        <div className={styles.main_panel}>
          {selectedFile && <Editor key={selectedFile.id} file={selectedFile} />}
        </div>
      </div>
    </div>
  );
}
