import { css } from "@linaria/core";

export const tab_group_wrapper = css`
  height: 35px;
  width: 100%;

  background-color: var(--primary-color);

  overflow-x: scroll;

  display: flex;
  flex-direction: row;
`;

export const tab_wrapper = css`
  max-width: 200px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  color: var(--secondary-color);

  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-light);

    button {
      color: var(--secondary-color-light);
    }
  }
`;

export const tab_icon = css`
  padding-left: 14px;
`;

export const tab_text = css`
  padding-left: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const tab_button = css`
  margin: 0 3px;

  height: 24px;
  width: 24px;

  background-color: transparent;
  border: none;
  border-radius: 5px;

  color: transparent;

  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color-dark);
  }
`;
