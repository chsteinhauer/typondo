import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function createFileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  const file = await prisma.file.create({
    data: {
      title: body.title,
      authorId: body.authorId,
    },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      file,
    }),
  );
}

export async function getFileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const file = await prisma.file.findUnique({
    where: { id: Number(req.query?.["id"]) },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      file,
    }),
  );
}
