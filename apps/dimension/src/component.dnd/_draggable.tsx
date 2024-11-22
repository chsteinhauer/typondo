import { useDraggable } from "@dnd-kit/core";
import { cx } from "@linaria/core";
import React, { useEffect, useState } from "react";

import type { DraggableProps } from "./_dnd.interfaces";
import * as styles from "./_dnd.styles";
import { DraggableOverlay } from "./_draggable-overlay";

export function Draggable(props: DraggableProps) {
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const mouseMoveHandler = (e) => {
    setCoord({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
  });

  const draggableElement = () => (
    <div
      ref={setNodeRef}
      //style={style}
      {...listeners}
      {...attributes}
      className={cx(styles.draggable, isDragging ? "dragging" : "")}
    >
      {props.children}
    </div>
  );

  return (
    <>
      {draggableElement()}
      {isDragging && (
        <DraggableOverlay x={coord.x} y={coord.y}>
          {props.children}
        </DraggableOverlay>
      )}
    </>
  );
}
