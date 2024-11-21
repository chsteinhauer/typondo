import { css } from "@linaria/core";
//import "../global.style.js";

export const menu_panel_wrapper = css`
  z-index: 200;

  height: 100%;

  background-color: var(--primary-color);

  display: flex;
  flex-direction: row;
`;

export const menu_wrapper = css`
  height: 100%;

  border-right: 1px solid var(--secondary-color-light-trans);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const menu_logo = css`
  padding: 14px 0;

  img {
    margin: auto;

    height: 36px;
    width: 36px;

    display: block;

    opacity: 0.5;
  }
`;

export const menu_top = css`
  display: flex;
  flex-direction: column;
`;

export const menu_bottom = css`
  margin-bottom: 3px;

  display: flex;
  flex-direction: column;
`;

export const panel = css`
  height: 100%;
  width: 250px;

  border-right: 1px solid var(--secondary-color-light-trans);

  color: var(--secondary-color-light);
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
