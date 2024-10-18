import type { AppProps } from "next/app";

import "../src/global.style";
import Link from "next/link";
import { Menu } from "../src/component.menu/_menu";
import { pagewrapper } from "../src/global.style";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";

library.add(faCheckSquare, faCoffee, faFile);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={pagewrapper}>
        <Menu />

        <Component {...pageProps} />
      </div>
    </>
  );
}
