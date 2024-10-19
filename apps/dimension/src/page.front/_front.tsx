import type { Folder, User, File } from "@prisma/client";
import { useState } from "react";

import AppWrapper from "../app.wrapper/app.wrapper";
import { Editor } from "../page.editor/_editor";

import * as styles from "./_front.style";

export type FrontpageProps = {
  user: User | null;
  folders: Folder[];
  files: File[];
};

export function Frontpage(props: FrontpageProps) {
  const [showBox, setShowBox] = useState(false);

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

  return (
    <AppWrapper
      menu={{ files: props.files, folders: props.folders, user: props.user }}
    >
      <div className={styles.wrapper}>
        {/* <div>I come from the server: {props.myServerSideProp}</div>

      <Link href="/another">to another</Link>


      <button onClick={() => setShowBox((prev) => !prev)}>Toggle</button>

      <Menu myMenuProp="hello" />

      <TransitionGroup className={styles.boxWrapper} component="div">
        {showBox && (
          <CSSTransition
            timeout={styles.crossfadeDurationMs}
            classNames={styles.box}
          >
            <div className={styles.box} />
          </CSSTransition>
        )}
      </TransitionGroup> */}
        {/* <button onClick={fetchData}>Fetch data from API</button> */}

        <Editor />
      </div>
    </AppWrapper>
  );
}
