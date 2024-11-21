import { css } from "@linaria/core";

export const window_wrapper = css`
  position: relative;

  height: 100%;
  width: 100%;

  overflow-y: scroll;
`;

export const window = css``;

export const window_tab_wrapper = css`
  position: fixed;
  z-index: 1;

  width: 100%;
`;

export const window_dropzone_overlay = css`
  position: fixed;
  inset: var(--window-header-size) 0 0 var(--side-menu-size);
  z-index: var(--droppable-z-index);

  border: 1px solid hotpink;

  transition: inset 150ms ease-in-out;

  &.window_dropzone_overlay_selector {
    &.top {
      inset: var(--window-header-size) 0
        calc(50% - var(--window-header-size) * 0.5) var(--side-menu-size);
    }

    &.bottom {
      inset: calc(50% + var(--window-header-size) * 0.5) 0 0
        var(--side-menu-size);
    }

    &.left {
      inset: var(--window-header-size) calc(50% - var(--side-menu-size) * 0.5) 0
        var(--side-menu-size);
    }

    &.right {
      inset: var(--window-header-size) 0 0
        calc((var(--side-menu-size) * 0.5) + 50%);
    }
  }
`;

export const window_dropzone_wrapper = css`
  position: relative;

  height: 100%;
  width: 100%;

  .window_droppable_button {
    position: fixed;
    z-index: calc(var(--droppable-z-index) * 2);

    height: 60px;
    width: 60px;

    background-color: transparent;
    border: none;

    color: white;

    opacity: 0.3;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const window_top_dropzone_button = css`
  top: var(--window-header-size);
  left: calc(50% + var(--side-menu-size) * 0.5);

  transform: translate(-50%, 0);
`;

export const window_bottom_dropzone_button = css`
  left: calc(50% + var(--side-menu-size) * 0.5);
  bottom: 0;

  transform: translate(-50%, 0);

  svg {
    transform: rotate(180deg);
  }
`;

export const window_left_dropzone_button = css`
  top: calc(50% + var(--window-header-size) * 0.5);
  left: var(--side-menu-size);

  transform: translate(0, -50%);

  svg {
    transform: rotate(270deg);
  }
`;

export const window_right_dropzone_button = css`
  top: calc(50% + var(--window-header-size) * 0.5);
  right: 0;

  transform: translate(0, -50%);

  svg {
    transform: rotate(90deg);
  }
`;

// export const window_top_dropzone = css`
//   position: fixed;
// inset: var(--window-header-size) 0 calc(50% - var(--window-header-size) *
// 0.5) var(--side-menu-size); z-index: var(--droppable-z-index);

//   border: 1px solid hotpink;

//   .window_droppable_button {
//     top: 0;
//     left: 50%;

//     transform: translate(-50%, 0);
//   }
// `;

// export const window_bottom_dropzone = css`
//   position: fixed;
// inset: calc(50% + var(--window-header-size) * 0.5) 0 0
// var(--side-menu-size); z-index: var(--droppable-z-index);

//   border: 1px solid hotpink;

//   .window_droppable_button {
//     left: 50%;
//     bottom: 0;

//     transform: translate(-50%, 0);

//     svg {
//       transform: rotate(180deg);
//     }
//   }
// `;

// export const window_left_dropzone = css`
//   position: fixed;
//   inset: var(--window-header-size) calc(50% - var(--side-menu-size) * 0.5) 0
//     var(--side-menu-size);
//   z-index: var(--droppable-z-index);

//   border: 1px solid hotpink;

//   .window_droppable_button {
//     top: 50%;
//     left: 0;

//     transform: translate(0, -50%);

//     svg {
//       transform: rotate(270deg);
//     }
//   }
// `;

// export const window_right_dropzone = css`
//   position: fixed;
// inset: var(--window-header-size) 0 0 calc((var(--side-menu-size) * 0.5) +
// 50%); z-index: var(--droppable-z-index);

//   border: 1px solid hotpink;

//   .window_droppable_button {
//     top: 50%;
//     right: 0;

//     transform: translate(0, -50%);

//     svg {
//       transform: rotate(90deg);
//     }
//   }
// `;
