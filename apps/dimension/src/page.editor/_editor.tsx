/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import type { File } from "@prisma/client";
import type { Editor } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

import { updateFile } from "../api/requests";

import { EditorToolbar } from "./_editor-toolbar";
import type { EditorProps } from "./_editor.interfaces";
import * as styles from "./_editor.styles";

export function EditorView(props: EditorProps) {
  const file = props.item.item as File;

  const editor = useEditor({
    extensions: [StarterKit],
    content: file.htmlContent,
    immediatelyRender: false,
  });

  const saveContent = async (_e: Editor | null, _f: File) => {
    _f.htmlContent = _e?.getHTML() ?? "";
    console.log(_e?.getHTML());
    await updateFile(_f);
  };

  // create editor instance and other stuff
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);

  useEffect(() => {
    if (debouncedEditor) {
      saveContent(editor, file);
    }
  }, [debouncedEditor, editor, file]);

  useEffect(() => {
    const keyDownHandler = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        await saveContent(editor, file);

        editor?.commands.blur();
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [editor, file]);

  return (
    <div className={styles.editor_wrapper}>
      <EditorToolbar editor={editor} />

      <div className={styles.editor_canvas_wrapper}>
        <div
          className={styles.editor_canvas}
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent className={styles.editor_content} editor={editor} />
        </div>
      </div>
    </div>
  );
}
