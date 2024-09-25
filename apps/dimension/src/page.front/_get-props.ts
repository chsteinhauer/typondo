import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { FrontpageProps } from "./_front";

export async function getFrontpageServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<FrontpageProps>> {
  console.log(context);

  return {
    props: {
      myServerSideProp: "hello from the server",
    },
  };
}
