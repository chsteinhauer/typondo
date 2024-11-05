import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { FrontpageProps } from "./_main";

const prisma = new PrismaClient();

export async function getFrontpageServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<FrontpageProps>> {
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
      user,
    },
  };
}
