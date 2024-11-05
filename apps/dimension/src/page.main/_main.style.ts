import { css } from "@linaria/core";

export const crossfadeDurationMs = 150;

export const main_wrapper = css`
  position: relative;

  height: 100%;
  width: 100%;

  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

export const main_menu = css``;

export const main_content = css`
  position: relative;

  height: 100%;
  width: 100%;

  overflow-y: scroll;
`;

export const main_panel = css``;

export const main_tab_wrapper = css`
  position: fixed;
  z-index: 1;

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
