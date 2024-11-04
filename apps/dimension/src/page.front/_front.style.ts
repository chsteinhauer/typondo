import { css } from "@linaria/core";

export const crossfadeDurationMs = 150;

export const front_wrapper = css`
  position: relative;
  overflow: hidden;
`;

export const front_panel = css``;

export const front_tab_wrapper = css`
  position: fixed;
  z-index: 1000;

  width: 100%;
`;

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
