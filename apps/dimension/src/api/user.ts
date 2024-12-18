import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
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
