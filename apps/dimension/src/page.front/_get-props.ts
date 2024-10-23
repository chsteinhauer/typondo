import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { FrontpageProps } from "./_front";

const prisma = new PrismaClient();

export async function getFrontpageServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<FrontpageProps>> {
  console.log(context);

  const user = await prisma.user.findUnique({
    where: { id: 2 },
    include: {
      folders: true,
      files: true,
    },
  });
  const folders = await prisma.folder.findMany({
    where: { authorId: user?.id },
  });
  const files = await prisma.file.findMany({ where: { authorId: user?.id } });

  return {
    props: {
      user,
      folders,
      files,
    },
  };
}
