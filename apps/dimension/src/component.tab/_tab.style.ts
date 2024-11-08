import { css } from "@linaria/core";

export const tab_group_wrapper = css`
  height: 35px;
  width: 100%;

  background-color: var(--primary-color);

  overflow-x: scroll;

  display: flex;
  flex-direction: row;
`;

export const tab = css`
  position: relative;
`;

export const tab_card = css`
  padding: 0;

  max-width: 175px;
  height: 100%;

  background-color: var(--primary-color);
  border: 1px solid transparent;
  border-right: 1px solid var(--secondary-color-dark);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  color: var(--secondary-color);

  cursor: pointer;

  svg {
    height: 14px;
    width: 14px;
  }
`;

export const tab_icon = css`
  padding-left: 14px;
`;

export const tab_text = css`
  margin-right: 32px;
  padding-left: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const tab_button = css`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;

  height: 24px;
  width: 24px;

  background-color: transparent;
  border: none;
  border-radius: 5px;

  color: var(--secondary-color-light);

  cursor: pointer;

  opacity: 0;

  &:hover {
    background-color: rgba(0 0 0 / 0.1);
  }

  .${tab}:hover &,
  &:focus-visible {
    color: var(--secondary-color-dark);
    opacity: 1;
  }
`;

export const tab_selected = css`
  background-color: var(--background-color);
  border-top: 2px solid var(--complementary-color-light);

  color: var(--primary-color-light);

  &:hover {
    background-color: var(--background-color);
  }
`;
