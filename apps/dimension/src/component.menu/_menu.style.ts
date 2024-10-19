import { css } from "@linaria/core";
import "../global.style.ts";

export const wrapper = css`
  height: 100%;

  background-color: var(--primary-color);

  display: flex;
  flex-direction: row;
`;

export const panel = css`
  height: 100%;
  width: 250px;

  color: var(--secondary-color-light);
`;

export const menu = css`
  border-right: 1px solid var(--secondary-color-dark);

  display: flex;
  flex-direction: column;
`;

export const item = css`
  padding: 14px;

  background-color: transparent;
  border: 3px solid transparent;

  color: var(--secondary-color);

  cursor: pointer;

  svg {
    height: 22px;
    width: 22px;
  }

  &:hover {
    color: var(--secondary-color-light);
  }
`;

export const selected_item = css`
  border-left: 3px solid var(--complementary-color-light);
  color: var(--secondary-color-light);
`;

export const icon = css`
  height: 24px;
  width: 24px;
`;
