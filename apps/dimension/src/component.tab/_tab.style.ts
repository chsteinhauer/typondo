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

  &:hover {
    /* :not(.) {
      background-color: var(--primary-color-light);
      color: var(--secondary-color-light);
    } */
  }
`;

export const tab_button = css`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;

  height: 26px;
  width: 26px;

  background-color: transparent;
  border: none;
  border-radius: 5px;

  color: var(--secondary-color-light);

  cursor: pointer;

  opacity: 0;

  svg {
    margin: auto;

    height: 14px;
    width: 14px;

    display: block;
  }

  &:hover {
    background-color: rgba(0 0 0 / 0.1);
  }

  .${tab}:hover &,
  &:focus-visible {
    color: var(--secondary-color-light);
    opacity: 1;
  }
`;

export const tab_card = css`
  padding: 0;

  max-width: 175px;
  height: 100%;

  background-color: var(--primary-color);
  border: 1px solid transparent;
  border-right: 1px solid var(--secondary-color-light-trans);

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
  margin-right: 36px;
  padding-left: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const tab_open = css`
  background-color: var(--background-color);
  color: var(--background-text-color);

  &:hover {
    background-color: var(--background-color);
    color: var(--background-text-color);
  }
`;

export const tab_focus = css`
  border-top: 2px solid var(--complementary-color-light);
`;
