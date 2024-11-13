import { faBold } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";

import { EditorToolbarButton } from "./_editor-toolbar-button";
import type { ToolbarEditorProps } from "./_editor.interfaces";
import * as styles from "./_editor.styles";

{
  /* <ToolbarButton
          value="bold"
          aria-label="Toggle Bold selection"
          onClick={() => editor.chain().focus().toggleBold().run()}
          selected={editor.isActive("bold")}>
          <FormatBoldIcon />
        </ToolbarButton>
        <ToolbarButton
          value="italic"
          aria-label="Toggle Italic selection"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          selected={editor.isActive("italic")}>
          <FormatItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          value="underline"
          aria-label="Toggle Italic selection"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          selected={editor.isActive("underline")}>
          <FormatUnderlinedIcon />
        </ToolbarButton> */
}

export function EditorToolbar(props: ToolbarEditorProps) {
  const { editor } = props;
  return (
    <div className={styles.editor_toolbar_wrapper}>
      <div className={styles.editor_toolbar}>
        <EditorToolbarButton
          value="bold"
          aria-label="Toggle Bold selection"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          editor={editor}
        >
          <FontAwesomeIcon icon={faBold} />
        </EditorToolbarButton>
      </div>
    </div>
  );
}
