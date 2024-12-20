import { css } from "@linaria/core";

export const window_wrapper = css`
  position: relative;
  z-index: 10;

  width: 100%;

  border-right: 1px solid var(--secondary-color-light-trans);
  border-bottom: 1px solid var(--secondary-color-light-trans);

  overflow: auto;
`;

export const window = css`
  width: 100%;
  background-color: var(--background-color);
`;

export const window_tab_wrapper = css`
  position: sticky;
  top: 0;
  z-index: 1;

  width: 100%;
`;

export const window_dropzone_overlay = css`
  position: absolute;

  background-color: rgba(255 255 255 / 0.2);
  border: none;

  display: var(--droppable-display);

  transition: inset 150ms ease-in-out;

  /* inset: var(--window-header-size) 0 0 var(--side-menu-size); */
  inset: 0;
  z-index: var(--droppable-z-index);

  &.window_dropzone_overlay_selector {
    &.top {
      /* inset: var(--window-header-size) 0
       *        calc(50% - var(--window-header-size) * 0.5)
       *        var(--side-menu-size);
       */
      inset: 0 0 50%;
    }

    &.bottom {
      /* inset: calc(50% + var(--window-header-size) * 0.5) 0 0
        var(--side-menu-size); */
      inset: 50% 0 0;
    }

    &.left {
      /* 
       * inset: var(--window-header-size) calc(50% - var(--side-menu-size) *
       * 0.5) 0
        var(--side-menu-size); */
      inset: 0 50% 0 0;
    }

    &.right {
      /* inset: var(--window-header-size) 0 0
        calc((var(--side-menu-size) * 0.5) + 50%); */
      inset: 0 0 0 50%;
    }
  }

  .container {
    position: fixed;
  }
`;

export const window_top_dropzone_button = css`
  transform: translate(-50%, 0);

  /* top: var(--window-header-size);
  left: var(--side-menu-size);
  right: 0; */

  /* left: calc(50% + var(--side-menu-size) * 0.5); */
  top: 0;
  left: 50%;
`;

export const window_bottom_dropzone_button = css`
  transform: translate(-50%, 0);

  /* left: calc(50% + var(--side-menu-size) * 0.5);
  bottom: 0; */
  left: 50%;
  bottom: 0;

  svg {
    transform: rotate(180deg);
  }
`;

export const window_left_dropzone_button = css`
  transform: translate(0, -50%);

  /* top: calc(50% + var(--window-header-size) * 0.5);
  left: var(--side-menu-size); */
  top: 50%;
  left: 0;

  svg {
    transform: rotate(270deg);
  }
`;

export const window_right_dropzone_button = css`
  transform: translate(0, -50%);

  /* top: calc(50% + var(--window-header-size) * 0.5);
  right: 0; */
  top: 50%;
  right: 0;

  svg {
    transform: rotate(90deg);
  }
`;

export const window_dropzone_wrapper = css`
  position: relative;
  width: 100%;
  transform: translateZ(0);

  .window_droppable_button {
    position: absolute;
    z-index: calc(var(--droppable-z-index) * 2);

    height: 60px;
    width: 60px;

    background-color: transparent;
    border: none;

    display: var(--droppable-display);

    color: white;

    opacity: 0.3;

    &:hover {
      opacity: 0.9;
    }

    .container {
      position: fixed;

      height: 100%;
      width: 100%;
    }
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
