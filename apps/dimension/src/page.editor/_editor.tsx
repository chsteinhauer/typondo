import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as styles from "./_editor.styles";

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className={styles.editor_wrapper}>
      <div className={styles.editor_toolbar}>
        {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      </div>

      <div className={styles.editor_canvas}>
        <EditorContent className={styles.editor_content} editor={editor} />
      </div>
    </div>
  );
}
