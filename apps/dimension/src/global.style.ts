import { css } from "@linaria/core";
// //#0f434f;
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      --primary-color-dark: #012b35;
      --primary-color: #0f434f;
      --primary-color-light: #255c69;
      --secondary-color-dark: #447784;
      --secondary-color: #6b949e;
      --secondary-color-light: #a9c4ca;
      --complementary-color: #4f1b0f;
      --complementary-color-light: #b43e22;
      --complementary-color-light-trans: #b43e2252;

      /* light mode default */
      --background-color: #e8e8e8;
      --background-text-color: var(--primary-color-light);
      --editor-page-color: #ffff;
      --editor-page-border: #d3d3d3;
      --editor-text-color: #000;
    }

    #__next,
    html,
    body {
      margin: 0;

      height: 100%;

      -webkit-font-smoothing: antialiased;
      font-family: Arial;

      /* :focus {
        border-radius: 3px;
        outline: 2px solid var(--complementary-color-light);
      } */
    }

    .dark-mode {
      --background-color: #1f1f1f;
      --background-text-color: var(--secondary-color-light);
      --editor-page-color: #313335;
      --editor-page-border: #565656;
      --editor-text-color: #fff;
    }
  }
`;

export const app_wrapper = css`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
`;

export const page_wrapper = css`
  margin: 0;
  padding: 0;

  height: 100vh;
  width: 100%;

  background-color: var(--background-color);

  overflow-y: scroll;
`;
