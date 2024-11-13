import type { Editor } from "@tiptap/react";

import type { Item } from "../page.main/_main.interfaces";

export type EditorProps = {
  item: Item;
};

export type ToolbarEditorProps = {
  editor: Editor | null;
};
