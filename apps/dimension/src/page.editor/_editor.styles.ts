import { css } from "@linaria/core";
import "../global.style.ts";

export const editor_wrapper = css`
  /* height: 100%;
  width: 100%; */
  background-color: var(--background-color);
`;

export const editor_canvas_wrapper = css`
  padding-top: 80px;
`;

export const editor_canvas = css`
  margin: 24px auto;

  max-width: calc(210mm);
  width: 100%;

  cursor: text;

  &.page-view {
    height: 297mm;

    background-color: var(--editor-page-color);
    border: 1px solid var(--editor-page-border);
  }
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

export const editor_banner_wrapper = css`
  height: 20px;
  width: 100%;

  font-size: 13px;
  color: var(--background-text-color);
`;

export const editor_banner = css`
  margin: 5px 7px;

  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    height: 11px;
    width: 11px;
  }
`;

export const editor_banner_path_entry = css`
  padding: 0 2px;

  display: flex;
  flex-direction: row;
  align-items: center;

  line-height: 1;

  cursor: pointer;

  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export const editor_banner_saving = css`
  margin-left: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  opacity: 0;

  &.saving {
    opacity: 1;
  }
`;

export const editor_header = css`
  position: fixed;
  z-index: 1;

  margin-top: calc(35px);

  height: fit-content;
  width: 100%;

  background-color: var(--background-color);
  border-bottom: 1px solid var(--secondary-color-light-trans);

  //border-bottom: 1px solid var(--editor-page-border);
`;

export const editor_footer = css`
  position: fixed;
  right: 5px;
  bottom: 5px;
  z-index: 1;

  height: fit-content;

  background-color: var(--background-color);

  font-size: 12px;
  color: var(--background-text-color);
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
