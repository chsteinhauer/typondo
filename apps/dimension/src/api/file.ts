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
      folderId: body.folderId,
    },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      file,
    }),
  );
}

export async function updateFileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  const file = await prisma.file.update({
    where: { id: body.id },
    data: {
      title: body.title,
      folderId: body.folderId,
      htmlContent: body.htmlContent,
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
    where: { id: String(req.query?.["id"]) },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      file,
    }),
  );
}

export async function removeFileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  await prisma.file.delete({
    where: { id: body.id },
  });

  res.end(
    JSON.stringify({
      message: "ok",
    }),
  );
}
