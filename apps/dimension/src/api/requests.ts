import type { File, Folder, User } from "@prisma/client";

export type UserWithRelations = User & {
  folders: Folder[];
  files: File[];
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

export const createFile = async (file: File) => {
  const res = await fetch("/api/create-file", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...file,
    }),
  });

  const data = (await res.json()) as { ok: true; file: File };
  console.log(data);

  return data;
};

export const removeFile = async (file: File) => {
  const res = await fetch("/api/remove-file", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...file,
    }),
  });

  const data = await res.json();
  console.log(data);

  return data;
};

export const updateFolder = async (folder: Folder) => {
  const res = await fetch("/api/update-folder", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...folder,
    }),
  });

  const data = await res.json();
  console.log(data);
};

export const createFolder = async (folder: Folder) => {
  const res = await fetch("/api/create-folder", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...folder,
    }),
  });

  const data = await res.json();
  console.log(data);

  return data;
};
