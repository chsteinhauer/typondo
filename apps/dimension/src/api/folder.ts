import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function createFolderHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  const folder = await prisma.folder.create({
    data: {
      title: body.title,
      authorId: body.authorId,
      folderId: body.folderId,
    },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      folder,
    }),
  );
}
