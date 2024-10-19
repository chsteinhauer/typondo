import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  Editor as TiptapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as styles from "./_editor.styles";

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

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
