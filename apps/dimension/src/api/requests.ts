import type { File } from "@prisma/client";

const fetchData = async () => {
  // const res = await fetch("/api/user/1");

  // const res = await fetch("/api/create-user", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name: "test",
  //     email: "test@mail.com",
  //   }),
  // });

  const res = await fetch("/api/create-file", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: "test",
      authorId: 2,
      folderId: 1,
    }),
  });

  const data = await res.json();

  console.log(data);
};

export const updateFile = async (file: File) => {
  const res = await fetch("/api/update-file", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...file,
    }),
  });

  const data = await res.json();
  console.log(data);
};
