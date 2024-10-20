/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import type { File } from "@prisma/client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import { updateFile } from "../api/requests";

import * as styles from "./_editor.styles";

type EditorProps = {
  file: File;
};

export function Editor(props: EditorProps) {
  const { file } = props;

  const editor = useEditor({
    extensions: [StarterKit],
    content: file.htmlContent,
  });

  useEffect(() => {
    const keyDownHandler = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        file.htmlContent = editor?.getHTML() ?? "";
        console.log(editor?.getHTML());
        await updateFile(file);

        console.log("saved!!!");
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [editor, file]);

  return (
    <div className={styles.editor_wrapper}>
      <div className={styles.editor_toolbar}></div>

      <div
        className={styles.editor_canvas}
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent className={styles.editor_content} editor={editor} />
      </div>
    </div>
  );
}
