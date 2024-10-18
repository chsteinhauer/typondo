import { css } from "@linaria/core";
import "../global.style.ts";

export const wrapper = css`
  display: flex;
  flex-direction: row;

  background-color: var(--primary-color);
  height: 100%;
`;

export const panel = css`
  width: 250px;
  height: 100%;
  color: var(--secondary-color-light);
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--secondary-color-dark);
`;

export const item = css`
  padding: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--secondary-color);

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    color: var(--secondary-color-light);
  }
`;

export const icon = css`
  width: 24px;
  height: 24px;
`;
