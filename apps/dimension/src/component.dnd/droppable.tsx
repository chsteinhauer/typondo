import { useDroppable } from "@dnd-kit/core";
import React from "react";

import type { DroppableProps } from "./_dnd.interfaces";

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
