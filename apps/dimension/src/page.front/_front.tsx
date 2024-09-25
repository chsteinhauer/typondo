import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import * as styles from "./_front.style";

export type FrontpageProps = {
  myServerSideProp: string;
};

export function Frontpage(props: FrontpageProps) {
  const [toggle, setToggle] = useState(false);

  console.log(props);

  const fetchData = async () => {
    const res = await fetch("/api/heartbeat");
    const data = await res.json();

    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <div>I come from the server: {props.myServerSideProp}</div>

      <button onClick={fetchData}>Fetch data from API</button>

      <button onClick={() => setToggle((prev) => !prev)}>Toggle</button>

      <TransitionGroup className={styles.boxWrapper} component="div">
        <CSSTransition
          key={String(toggle)}
          timeout={styles.crossfadeDurationMs}
          classNames={styles.box}
        >
          <div
            className={styles.box}
            style={{ background: toggle ? "green" : "red" }}
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
