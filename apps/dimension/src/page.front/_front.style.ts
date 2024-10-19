import { css } from "@linaria/core";

export const crossfadeDurationMs = 150;

export const wrapper = css`
  height: 100%;
  width: 100%;

  font-size: 30px;
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
