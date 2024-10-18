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
    }

    #__next,
    html,
    body {
      margin: 0;

      height: 100%;

      -webkit-font-smoothing: antialiased;
      font-family: Arial;
    }
  }
`;

export const pagewrapper = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
