import { useDraggable } from "@dnd-kit/core";
import { cx } from "@linaria/core";
import React from "react";

import type { DraggableProps } from "./_dnd.interfaces";
import * as styles from "./_dnd.styles";

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cx(styles.draggable, isDragging ? "dragging" : "")}
    >
      {props.children}
    </div>
  );
}
