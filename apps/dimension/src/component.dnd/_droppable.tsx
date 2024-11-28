import { useDroppable } from "@dnd-kit/core";
import { cx } from "@linaria/core";
import React from "react";

import type { DroppableProps } from "./_dnd.interfaces";
import * as styles from "./_dnd.styles";

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });

  return (
    <div
      ref={setNodeRef}
      className={cx("droppable", isOver ? styles.droppable : "")}
    >
      {props.children}
    </div>
  );
}
