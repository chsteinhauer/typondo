import fs from "fs";

import { config } from "dotenv";
import { Html, Head, Main, NextScript } from "next/document";

const envFiles =
  process.env["ENV_FILES"]
    ?.split(";")
    .map((it) => it.trim())
    .filter(Boolean) ?? [];

for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    config({
      path: envFile,
      override: true,
    });
  }
}

export default function Document() {
  return (
    <Html lang="da">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
