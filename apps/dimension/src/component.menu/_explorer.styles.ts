import { css } from "@linaria/core";

export const wrapper = css`
  height: 100%;
`;

export const tree = css`
  --spacing: 1rem;
  --radius: 10px;

  padding: 0;
  font-size: 14px;

  li {
    position: relative;
    display: block;
  }

  ul {
    padding-left: 0;
  }

  ul li {
    transition: border-left 150ms linear;
  }

  &:hover ul li {
    //border-left: 1px solid var(--secondary-color-dark);
  }

  summary {
    display: block;
    cursor: pointer;
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  summary::marker,
  summary::-webkit-details-marker {
    display: none;
  }

  summary:focus {
    outline: none;
  }

  summary:focus-visible {
    outline: 1px dotted var(--secondary-color-light);
  }

  li::after,
  summary::before {
    content: "";

    position: absolute;
    top: calc(var(--spacing) / 2 - var(--radius));
    left: calc(var(--spacing) - var(--radius) - 1px);

    height: calc(2 * var(--radius));
    width: calc(2 * var(--radius));

    background: transparent;
    border-radius: 50%;

    display: block;
  }

  summary::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--%3E%3Cpath fill='%23ffffff' d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z'/%3E%3C/svg%3E");

    z-index: 1;

    margin-top: 5px;
    margin-left: 3px;

    height: 12px;
    width: 12px;

    opacity: 0.7;

    //background-position: calc(-2 * var(--radius)) 0;
  }

  details[open] > summary::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--%3E%3Cpath fill='%23ffffff' d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'/%3E%3C/svg%3E");
    //background-position: calc(-2 * var(--radius)) 0;
  }
`;

export const item = css`
  padding: 3px 0;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(0 0 0 / 0.2);
  }

  &.selected {
    border: 1px solid var(--complementary-color-light);
  }
`;

export const item_text = css`
  margin-left: 7px;
`;
