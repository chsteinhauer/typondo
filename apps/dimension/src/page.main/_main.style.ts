import { css } from "@linaria/core";

export const crossfadeDurationMs = 150;

export const main_wrapper = css`
  position: relative;

  height: 100vh;
  width: 100%;

  background-color: var(--background-color);

  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

export const main_menu = css``;

export const boxWrapper = css`
  position: relative;
`;

export const box = css`
  height: 150px;
  width: 150px;

  background: red;

  &-enter {
    opacity: 0;

    &-active {
      opacity: 1;
      transition: opacity ${crossfadeDurationMs}ms linear;
    }
  }

  &-exit {
    opacity: 1;

    &-active {
      opacity: 0;
      transition: opacity ${crossfadeDurationMs}ms linear;
    }
  }
`;
