import type { ReactNode } from "react";

export type DraggableProps = {
  id: string;
  children: ReactNode | ReactNode[];
};

export type DroppableProps = {
  id: string;
  children: ReactNode | ReactNode[];
};