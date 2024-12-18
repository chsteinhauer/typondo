import type { ReactNode } from "react";

export type DraggableProps = {
  id: string;
  children: ReactNode | ReactNode[];
};

export type DroppableProps = {
  id: string;
  data?: Record<string, unknown>;
  children?: ReactNode | ReactNode[];
};

export type DraggableOverlayProps = {
  x: number;
  y: number;
  children: ReactNode | ReactNode[];
};
