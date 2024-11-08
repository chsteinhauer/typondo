import type { AppProps } from "next/app";
import "../src/global.style";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="../public/logo-transparent.png" /> */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Typondo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
