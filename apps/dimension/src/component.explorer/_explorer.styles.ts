import { css } from "@linaria/core";

export const explorer_wrapper = css`
  padding-top: 35px;
  height: 100%;
`;

export const explorer_add_button_wrapper = css`
  margin: 3px 12px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  opacity: 0;

  .${explorer_wrapper}:hover &,
  &:focus-visible {
    opacity: 1;
  }
`;

export const explorer_add_button = css`
  margin: 0;
  padding: 2px 4px;

  background-color: transparent;
  border: none;
  border-radius: 3px;

  color: var(--secondary-color-light);

  cursor: pointer;

  opacity: 0.8;

  &:hover {
    background-color: var(--primary-color-light);
    opacity: 1;
  }

  svg {
    height: 14px;
    width: 14px;
  }
`;

export const explorer_tree_view = css`
  margin: 0;
  padding: 0;

  list-style: none;

  font-size: 14px;
`;

export const explorer_tree_node = css`
  position: relative;
`;

export const explorer_toggle_icon = css`
  position: absolute;
  top: 2px;
  left: 0;

  background-color: transparent;
  border: none;

  color: white;

  cursor: pointer;

  opacity: 0.8;

  svg {
    height: 11px;
    width: 11px;
  }
`;

export const explorer_tree_node_icon = css`
  svg {
    height: 14px;
    width: 14px;

    display: block;
  }
`;

export const explorer_tree_node_button = css`
  margin: 0;
  padding-block: 1px;
  padding-left: 25px;

  width: 100%;

  background-color: transparent;
  border: none;
  border: 1px solid transparent;

  color: var(--secondary-color-light);

  cursor: pointer;

  &:hover {
    background-color: rgba(0 0 0 / 0.2);
  }

  &.selected {
    &:not(.editable) {
      background-color: var(--complementary-color-light-trans);
      border: 1px solid var(--complementary-color-light);
    }
  }
`;

export const explorer_tree_node_title = css`
  display: flex;
  align-items: center;
  text-align: left;
`;

export const explorer_title = css`
  position: relative;

  padding-left: 7px;

  height: 16px;
  width: 100%;
`;

export const tree_node_indentation_line = css`
  --offset: 20px;

  position: absolute;
  top: var(--offset);
  left: calc(8px + var(--depth, 1) * 9px);

  height: calc(100% - var(--offset));
  width: 1px;

  background-color: var(--secondary-color-light-trans);

  opacity: 0;
  transition: opacity 150ms ease-in-out;

  .${explorer_wrapper}:hover &,
  &:focus-visible {
    opacity: 1;
  }
`;

export const tree_node_toggle_icon_indentation = css`
  padding-left: calc(6px + var(--depth, 1) * 9px);
`;

export const tree_node_title_indentation = css`
  padding-left: calc(24px + var(--depth, 1) * 9px);
`;
