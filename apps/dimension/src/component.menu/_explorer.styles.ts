import { css } from "@linaria/core";

export const crossfadeDurationMs = 150;

export const tree = css`
  --spacing: 1rem;
  --radius: 10px;

  padding: 0;
  font-size: 14px;

  li,
  ul,
  summary {
    padding: 3px;
  }

  li {
    position: relative;
    padding-left: calc(2 * var(--spacing) - var(--radius) - 2px);
    display: block;
  }

  ul {
    margin-left: calc(var(--radius) - var(--spacing));
    padding-left: 0;
  }

  ul li {
    border-left: 1px solid transparent;
    transition: border-left 150ms linear;
  }

  &:hover ul li {
    border-left: 1px solid var(--secondary-color-dark);
  }

  ul li::before {
    /* content: "";
    display: block;
    position: absolute;
    top: calc(var(--spacing) / -2);
    left: -2px;
    width: calc(var(--spacing) + 2px);
    height: calc(var(--spacing) + 1px);
    border: solid #ddd;
    border-width: 0 0 2px 2px; */
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
    z-index: 1;
  }

  details[open] > summary::before {
    background-position: calc(-2 * var(--radius)) 0;
  }
`;

export const item = css`
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-light);
  }
`;

export const item_text = css`
  margin-left: 7px;
`;
