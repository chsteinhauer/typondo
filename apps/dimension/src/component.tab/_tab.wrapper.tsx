import type { TabWrapperProps } from "./_tab.interfaces";
import * as styles from "./_tab.style";

export default function TabWrapper(props: TabWrapperProps) {
  return (
    <>
      <div className={styles.tab_group_wrapper}>{props.children}</div>
    </>
  );
}
