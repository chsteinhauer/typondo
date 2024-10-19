import type { AppProps } from "next/app";

import "../src/global.style";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
