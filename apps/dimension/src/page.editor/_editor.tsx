/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { File } from "@prisma/client";
import CharacterCount from "@tiptap/extension-character-count";
import type { Editor } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { updateFile } from "../api/requests";

import { EditorBanner } from "./_editor-banner";
import { EditorToolbar } from "./_editor-toolbar";
import type { EditorProps } from "./_editor.interfaces";
import * as styles from "./_editor.styles";

export function EditorView(props: EditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [characterCount, setCharacterCound] = useState<number>(0);
  const [wordCount, setWordCound] = useState<number>(0);

  const file = props.item.item as File;

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({})],
    content: file.htmlContent,
    immediatelyRender: false,
    onCreate({ e }) {
      countTheWords();
    },
    onUpdate({ e }) {
      countTheWords();
      setIsSaving(true);
    },
  });

  const saveContent = async (_e: Editor | null, _f: File) => {
    setIsSaving(true);

    _f.htmlContent = _e?.getHTML() ?? "";
    await updateFile(_f);

    setIsSaving(false);
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
      <div className={styles.editor_header}>
        <EditorBanner item={props.item} isSaving={isSaving} />
        <EditorToolbar editor={editor} />
      </div>

      <div className={styles.editor_canvas_wrapper}>
        <div
          className={styles.editor_canvas}
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent className={styles.editor_content} editor={editor} />
        </div>
      </div>

      <div className={styles.editor_footer}>
        <span>{editor?.storage["characterCount"]?.words()}</span>
        <span> words </span>
        {/* <span> characters: </span>
        <span>{editor?.storage["characterCount"].characters()}</span> */}
      </div>
    </div>
  );
}
