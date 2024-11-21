import { css } from "@linaria/core";

export const droppable = css`
  background-color: rgba(255 255 255 / 0.3);
`;

export const draggable = css`
  z-index: 100000;
  display: inline;

  &.dragging {
    display: block;
  }
`;
