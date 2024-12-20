import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { UserWithRelations } from "../api/requests";

import type { MainProps } from "./_main.interfaces";

const prisma = new PrismaClient();

export async function getFrontpageServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<MainProps>> {
  console.log(context);

  // const user = await prisma.user.findUnique({
  //   where: { id: "2" },
  //   include: {
  //     folders: true,
  //     files: true,
  //   },
  // });

  const user = await prisma.user.findFirst({
    include: {
      folders: true,
      files: true,
    },
  });

  if (user) {
    const sorted = user.files.sort((a, b) => a.title.localeCompare(b.title));
    user.files = sorted;
  }

  return {
    props: {
      user: user as UserWithRelations,
    },
  };
}
