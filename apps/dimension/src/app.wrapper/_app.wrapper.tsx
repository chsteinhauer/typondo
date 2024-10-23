import type { ReactNode } from "react";

import type { MenuProps } from "../component.menu/_menu";
import { Menu } from "../component.menu/_menu";
import * as styles from "../global.style";

type Props = {
  menu: MenuProps;
  children: ReactNode | ReactNode[];
};

export default function AppWrapper(props: Props) {
  return (
    <>
      <div className={styles.app_wrapper}>
        <Menu {...props.menu} />

        <div className={styles.page_wrapper}>{props.children}</div>
      </div>
    </>
  );
}
