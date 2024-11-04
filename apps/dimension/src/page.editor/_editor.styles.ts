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
  margin: 24px auto;

  height: 297mm;
  width: 210mm;

  background-color: white;
  border: 1px solid lightgray;

  cursor: text;
`;

export const editor_content = css`
  margin: 96px;

  .ProseMirror:focus {
    outline: none;
  }
`;
