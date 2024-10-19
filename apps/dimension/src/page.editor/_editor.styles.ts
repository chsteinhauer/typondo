import { css } from "@linaria/core";
import "../global.style.ts";

export const editor_wrapper = css`
  height: 100%;
  width: 100%;

  background-color: var(--background-color);
`;

export const editor_toolbar = css`
  height: 100px;
`;

export const editor_canvas = css`
  height: 297mm;
  width: 210mm;
  margin: 24px auto;

  cursor: text;

  background-color: white;
  border: 1px solid lightgray;
`;

export const editor_content = css`
  margin: 96px;

  .ProseMirror:focus {
    outline: none;
  }
`;
