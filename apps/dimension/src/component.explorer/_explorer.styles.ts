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
