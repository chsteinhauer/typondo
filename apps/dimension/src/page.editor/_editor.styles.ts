import { css } from "@linaria/core";
import "../global.style.ts";

export const editor_wrapper = css`
  height: 100%;
  width: 100%;

  background-color: var(--background-color);
`;

export const editor_canvas_wrapper = css`
  padding-top: 80px;
`;

export const editor_canvas = css`
  margin: 24px auto;

  max-width: calc(210mm);
  height: 297mm;
  width: 100%;

  background-color: var(--editor-page-color);
  border: 1px solid var(--editor-page-border);

  cursor: text;
`;

export const editor_content = css`
  color: var(--editor-text-color);

  .tiptap {
    padding: 96px;
  }

  .ProseMirror:focus {
    outline: none;
  }
`;

export const editor_toolbar_wrapper = css`
  position: fixed;
  z-index: 1;

  margin-top: calc(35px);

  height: fit-content;
  width: 100%;

  background-color: var(--background-color);
  border-bottom: 1px solid var(--editor-page-border);
`;

export const editor_toolbar = css`
  position: relative;

  margin: 7px;

  max-width: 100%;
  height: 100%;
  width: 100%;

  display: block;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const editor_toolbar_button = css`
  height: 28px;
  width: 28px;

  background-color: transparent;
  border: 1px solid var(--editor-page-border);
  border-radius: 3px;

  color: var(--editor-text-color);

  cursor: pointer;

  &:hover {
    background-color: var(--editor-page-border);
  }

  &.selected {
    background-color: var(--complementary-color-light);
  }

  svg {
    height: 12px;
    width: 12px;
  }
`;
