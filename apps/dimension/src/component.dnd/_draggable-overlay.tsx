import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";

import type { DraggableOverlayProps } from "./_dnd.interfaces";

export function DraggableOverlay(props: DraggableOverlayProps) {
  return createPortal(
    <DragOverlay zIndex={9999}>{props.children}</DragOverlay>,
    document.body,
  );

  // {
  //   createPortal(
  //     <DragOverlay zIndex={9999}>{props.children}</DragOverlay>,
  //     document.body,
  //   );
  // }
}
