import type { NextApiRequest, NextApiResponse } from "next";

export default function heartbeatHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.end(
    JSON.stringify({
      message: "ok",
      buildTag: process.env["BUILD__TAG"],
      serverDate: new Date().toISOString(),
    }),
  );
}
