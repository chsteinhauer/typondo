import { useDroppable } from "@dnd-kit/core";
import React from "react";

import type { DroppableProps } from "./_dnd.interfaces";
import * as styles from "./_dnd.styles";

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className={isOver ? styles.droppable : ""}>
      {props.children}
    </div>
  );
}
