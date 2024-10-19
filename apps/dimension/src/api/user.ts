import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      user,
    }),
  );
}

export async function getUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.query?.["id"]) },
  });

  res.end(
    JSON.stringify({
      message: "ok",
      user,
    }),
  );
}
