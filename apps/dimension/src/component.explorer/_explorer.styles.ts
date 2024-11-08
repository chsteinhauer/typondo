import { css } from "@linaria/core";

export const explorer_wrapper = css`
  padding-top: 35px;
  height: 100%;
`;

export const explorer_tree_view = css`
  margin: 0;
  padding: 0;

  list-style: none;

  font-size: 14px;
`;

export const explorer_tree_node = css`
  position: relative;

  margin: 0;
  padding-block: 1px;

  border: 1px solid transparent;

  cursor: pointer;

  &:hover {
    background-color: rgba(0 0 0 / 0.2);
  }

  &.selected {
    background-color: var(--complementary-color-light-trans);
    border: 1px solid var(--complementary-color-light);
  }
`;

export const explorer_toggle_icon = css`
  position: absolute;
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
  padding-left: 25px;

  width: 100%;

  background-color: transparent;
  border: none;

  display: flex;
  align-items: center;
  text-align: left;

  color: var(--secondary-color-light);

  cursor: pointer;
`;

export const explorer_title = css`
  padding-left: 7px;
`;
