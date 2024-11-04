import type { ReactNode } from "react";

import * as styles from "./_tab.style";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function TabWrapper(props: Props) {
  return (
    <>
      <div className={styles.tab_group_wrapper}>{props.children}</div>
    </>
  );
}
