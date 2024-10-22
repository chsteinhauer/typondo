import { css } from "@linaria/core";

export const container = css`
  position: absolute;
  z-index: 5000;

  background-color: white;
  border: 1px solid lightgray;
  border-radius: 1px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  ul {
    margin: 0;
    padding: 0;

    list-style-type: none;
  }
`;

export const option = css`
  height: 30px;
  width: 100%;
  min-width: 125px;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 14px;
  color: var(--primary-color-light);

  cursor: pointer;

  &:hover {
    background-color: lightgray;
    color: var(--primary-color);
  }

  span {
    padding-left: 7px;
  }
`;
