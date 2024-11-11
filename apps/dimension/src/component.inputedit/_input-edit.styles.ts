import { css } from "@linaria/core";
//import "../global.style.js";

export const input_edit = css`
  position: absolute;
  top: -1px;

  padding: 2px;

  max-width: 190px;
  width: 100%;

  background-color: transparent;
  border: none;

  color: white;

  &:focus {
    border-radius: 3px;
    outline: 1px solid var(--complementary-color-light);
  }
`;
